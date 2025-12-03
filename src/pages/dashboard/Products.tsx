import { HookFormProvider } from "@/components/form/HookFormProvider";
import { InputField } from "@/components/form/InputField";
import { SelectField } from "@/components/form/SelectField";
import { Button } from "@/components/ui/button";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Card, CardContent } from "@/components/ui/card";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { DashboardCard } from "./components/DashboardCard";
import { authApi } from "@/lib/api";
import { queryClient } from "@/lib/react-query";
import {
    ProductCreateSchema,
    type ProductCreateType,
} from "@/schemas/dashboard/product-create";
import {
    ProductUpdateSchema,
    type ProductUpdateType,
} from "@/schemas/dashboard/product-update";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
    Box,
    CheckCircle2,
    XCircle,
    AlertTriangle,
    Plus,
    Package,
    Pencil,
    Trash2,
} from "lucide-react";
import { useState, useMemo } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import clsx from "clsx";

interface RefProduct {
    id: string;
    gtin: string;
    description: string;
    brand: string;
    avg_price: number | null; // note snake_case conforme o backend
    image?: string;
}

interface Origin {
    id: number;
    cpf_cnpj_origin?: string;
    name?: string; // você pode preencher com cpf_cnpj_origin no render
    document?: string;
    date?: string;
    origin?: string;
    SEI_process?: number | string;
}

interface Product {
    id: string;
    validity: string;
    quantity: number;
    refProduct: RefProduct;  // aqui camelCase como o backend envia
    origin: Origin;
}

interface ProductStats {
    total: number;
    active: number;
    inactive: number;
    outOfStock: number;
}

export default function Products() {
    const [page, setPage] = useState(1);
    const [open, setOpen] = useState(false);
    const [openEdit, setOpenEdit] = useState(false);
    const [size] = useState(10);

    const { data: products, isLoading } = useQuery<Product[]>({
        queryKey: ["products"],
        queryFn: async () => {
            const { data } = await authApi.get("/product");
            return data as Product[];
        },
        staleTime: 1000 * 10,
    });

    const isExpired = (validity?: string) => {
        if (!validity) return false;
        const date = new Date(validity);
        if (Number.isNaN(date.getTime())) return false;
        return date.getTime() < Date.now();
    };

    const stats = useMemo<ProductStats>(() => {
        if (!products) {
            return { total: 0, active: 0, inactive: 0, outOfStock: 0 };
        }

        const total = products.length;
        const outOfStock = products.filter((p) => (p.quantity ?? 0) === 0).length;
        const inactive = products.filter((p) => isExpired(p.validity)).length;
        const active = total - inactive;

        return { total, active, inactive, outOfStock };
    }, [products]);

    const paginatedProducts = useMemo(() => {
        if (!products) return [];
        const start = (page - 1) * size;
        const end = start + size;
        return products.slice(start, end);
    }, [products, page, size]);

    const totalPages = useMemo(() => {
        if (!products) return 1;
        return Math.max(1, Math.ceil(products.length / size));
    }, [products, size]);

    const formatValue = (value?: number | null) => {
        if (value === null || value === undefined) return "R$0,00";
        return `R$${value.toFixed(2).replace(".", ",")}`;
    };

    const getStatusBadge = (expired: boolean) => {
        return {
            text: expired ? "Expirado" : "Ativo",
            className: expired ? "bg-red-100 text-red-800" : "bg-green-100 text-green-800",
        };
    };

    const { data: refProducts } = useQuery<RefProduct[]>({
        queryKey: ["refProducts"],
        queryFn: async () => {
            const { data } = await authApi.get("/product/refProduct");
            return data as RefProduct[];
        },
        staleTime: 1000 * 60,
    });

    const { data: origins } = useQuery<Origin[]>({
        queryKey: ["origins"],
        queryFn: async () => {
            const { data } = await authApi.get("/origin");
            return data as Origin[];
        },
        staleTime: 1000 * 60,
    });

    const form = useForm<ProductCreateType>({
        resolver: zodResolver(ProductCreateSchema),
        mode: "onChange",
        reValidateMode: "onChange",
        defaultValues: {
            validity: "",
            quantity: "1",
            refProductId: "",
            originId: "",
        },
    });

    const createProduct = useMutation({
        mutationFn: async (payload: ProductCreateType) => {
            const validityIso = `${payload.validity}T00:00:00`;

            const body = {
                validity: validityIso,
                quantity: Number(payload.quantity),
                ref_product_id: {
                    id: payload.refProductId,
                },
                origin_id: {
                    id: Number(payload.originId),
                },
            };

            const res = await authApi.post("/product", body);
            return res;
        },
        onSuccess: () => {
            toast.success("Produto criado com sucesso!");
            form.reset();
            setOpen(false);
            queryClient.invalidateQueries({ queryKey: ["products"] });
        },
        onError: (err) => {
            console.error(err);
            toast.error("Erro ao criar produto. Tente novamente.");
        },
    });

    const handleCreateSubmit = (data: ProductCreateType) => {
        createProduct.mutate(data);
    };

    const editForm = useForm<ProductUpdateType>({
        resolver: zodResolver(ProductUpdateSchema),
        mode: "onChange",
        reValidateMode: "onChange",
        defaultValues: {
            id: "",
            validity: "",
            quantity: "1",
            refProductId: "",
            originId: "",
        },
    });

    const updateProduct = useMutation({
        mutationFn: async (payload: ProductUpdateType) => {
            const validityIso = `${payload.validity}T00:00:00`;

            const body = {
                validity: validityIso,
                quantity: Number(payload.quantity),
                ref_product_id: {
                    id: payload.refProductId,
                },
                origin_id: {
                    id: Number(payload.originId),
                },
            };

            console.log("Atualizando produto:", payload.id, "com body:", body);
            const { data } = await authApi.put(`/product/${payload.id}`, body);
            console.log("PUT response", data);
            return data;
        },
        onSuccess: async () => {
            toast.success("Produto atualizado com sucesso!");
            editForm.reset();
            setOpenEdit(false);
            await queryClient.invalidateQueries({ queryKey: ["products"] });
            await queryClient.refetchQueries({ queryKey: ["products"] });
          },
        onError: (err) => {
            console.error("Erro ao atualizar produto:", err);
            toast.error("Erro ao atualizar produto. Verifique os dados.");
            throw err;
        },
    });

    const deleteProduct = useMutation({
        mutationFn: async (productId: string) => {
            console.log("Deletando produto com ID:", productId);
            const response = await authApi.delete(`/product/${productId}`);
            console.log("Resposta da deleção:", response);
            return response;
        },
        onSuccess: (_, productId) => {
            console.log("Produto deletado com sucesso:", productId);
            toast.success("Produto excluído com sucesso!");
            // Invalidar e refetch imediatamente
            queryClient.invalidateQueries({ queryKey: ["products"] });
            queryClient.refetchQueries({ queryKey: ["products"] });
        },
        onError: (err, productId) => {
            console.error("Erro ao deletar produto:", productId, err);
            toast.error("Falha ao excluir produto");
        },
    });

    const handleEdit = (product: Product) => {
        // Formatar a data para o input type="date" (YYYY-MM-DD)
        const validityDate = product.validity
            ? new Date(product.validity).toISOString().split("T")[0]
            : "";
        
        editForm.reset({
            id: product.id,
            validity: validityDate,
            quantity: String(product.quantity),
            refProductId: product.refProduct?.id || "",
            originId: String(product.origin?.id || ""),
        });
        setOpenEdit(true);
    };

    const handleEditSubmit = async (data: ProductUpdateType) => {
        return updateProduct.mutateAsync(data);
    };

    const handleDelete = (product: Product) => {
        if (window.confirm(`Tem certeza que deseja excluir este produto?\n\nID: ${product.id}\nProduto: ${product.refProduct?.description || "N/A"}`)) {
            // Garantir que estamos usando o ID do produto, não do refProduct
            console.log("Iniciando deleção do produto:", {
                productId: product.id,
                refProductId: product.refProduct?.id,
                description: product.refProduct?.description,
            });
            deleteProduct.mutate(product.id);
        }
    };

    return (
        <div className="p-4">
            {/* Cards superiores */}
            <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <DashboardCard
                    title="Total de Produtos"
                    icon={<Box className="h-4 w-4 text-blue-500" />}
                    content={isLoading ? "Carregando..." : String(stats.total)}
                />
                <DashboardCard
                    title="Produtos Ativos"
                    icon={<CheckCircle2 className="h-4 w-4 text-green-500" />}
                    content={isLoading ? "Carregando..." : String(stats.active)}
                />
                <DashboardCard
                    title="Produtos Inativos"
                    icon={<XCircle className="h-4 w-4 text-red-500" />}
                    content={isLoading ? "Carregando..." : String(stats.inactive)}
                />
                <DashboardCard
                    title="Fora de Estoque"
                    icon={<AlertTriangle className="h-4 w-4 text-yellow-500" />}
                    content={isLoading ? "Carregando..." : String(stats.outOfStock)}
                />
            </div>

            {/* Seção principal com título e botão */}
            <div className="flex items-center justify-between pt-6 pb-2">
                <div>
                    <h3 className="text-bold text-lg">Inventário de produtos</h3>
                    <h4 className="text-muted-foreground text-sm">
                        Gerencie seus itens de estoque e níveis de inventário
                    </h4>
                </div>

                <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger asChild>
                        <Button className="bg-blue-950 hover:bg-blue-900 cursor-pointer text-white">
                            <Plus />
                            Criar Produto
                        </Button>
                    </DialogTrigger>

                    <DialogContent className="max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Adicionar Novo Produto</DialogTitle>
                            <DialogDescription>
                                Formulário para adicionar um novo produto ao estoque.
                            </DialogDescription>
                        </DialogHeader>

                        <HookFormProvider form={form} onSubmit={handleCreateSubmit}>
                            <div className="space-y-4">
                                <InputField
                                    control={form.control}
                                    name="validity"
                                    label="Validade"
                                    type="date"
                                />

                                <InputField
                                    control={form.control}
                                    name="quantity"
                                    label="Quantidade"
                                    type="number"
                                    min={1}
                                />

                                <SelectField
                                    control={form.control}
                                    name="refProductId"
                                    label="Produto base"
                                    options={
                                        (refProducts ?? []).map((ref) => ({
                                            value: ref.id,
                                            label: `${ref.description} - ${ref.brand}`,
                                        }))}
                                />

                                <SelectField
                                    control={form.control}
                                    name="originId"
                                    label="Origem"
                                    options={
                                        (origins ?? []).map((origin) => ({
                                            value: String(origin.id),
                                            label: `${origin.origin} - ${origin.cpf_cnpj_origin} - ${origin.SEI_process ? `(${origin.SEI_process})` : ""}`,
                                        }))}
                                />

                                <Button
                                    type="submit"
                                    className="w-full bg-blue-950 hover:bg-blue-900"
                                    disabled={
                                        !form.formState.isValid || createProduct.status === "pending"
                                    }
                                >
                                    {createProduct.status === "pending"
                                        ? "Criando..."
                                        : "Criar Produto"}
                                </Button>
                            </div>
                        </HookFormProvider>
                    </DialogContent>
                </Dialog>

                <Dialog open={openEdit} onOpenChange={setOpenEdit}>
                    <DialogContent className="max-h-[90vh] overflow-y-auto">
                        <DialogHeader>
                            <DialogTitle>Editar Produto</DialogTitle>
                            <DialogDescription>
                                Formulário para editar um produto existente.
                            </DialogDescription>
                        </DialogHeader>

                        <HookFormProvider form={editForm} onSubmit={handleEditSubmit}>
                            <div className="space-y-4">
                                <InputField
                                    control={editForm.control}
                                    name="validity"
                                    label="Validade"
                                    type="date"
                                />

                                <InputField
                                    control={editForm.control}
                                    name="quantity"
                                    label="Quantidade"
                                    type="number"
                                    min={1}
                                />

                                <SelectField
                                    control={editForm.control}
                                    name="refProductId"
                                    label="Produto base"
                                    options={
                                        (refProducts ?? []).map((ref) => ({
                                            value: ref.id,
                                            label: `${ref.description} - ${ref.brand}`,
                                        }))}
                                />

                                <SelectField
                                    control={editForm.control}
                                    name="originId"
                                    label="Origem"
                                    options={
                                        (origins ?? []).map((origin) => ({
                                            value: String(origin.id),
                                            label: `${origin.origin} - ${origin.cpf_cnpj_origin} - ${origin.SEI_process ? `(${origin.SEI_process})` : ""}`,
                                        }))}
                                />

                                <Button
                                    type="submit"
                                    className="w-full bg-blue-950 hover:bg-blue-900"
                                    disabled={
                                        !editForm.formState.isValid || updateProduct.status === "pending"
                                    }
                                >
                                    {updateProduct.status === "pending"
                                        ? "Atualizando..."
                                        : "Atualizar Produto"}
                                </Button>
                            </div>
                        </HookFormProvider>
                    </DialogContent>
                </Dialog>
            </div>

            {/* Tabela de produtos */}
            <Card className="mt-6">
                <CardContent className="p-0">
                    {isLoading ? (
                        <div className="text-muted-foreground py-8 text-center">
                            Carregando produtos...
                        </div>
                    ) : !products || products.length === 0 ? (
                        <div className="text-muted-foreground py-8 text-center">
                            Nenhum produto encontrado.
                        </div>
                    ) : (
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-muted-foreground text-xs">PRODUTO</TableHead>
                                    <TableHead className="text-muted-foreground text-xs">CÓDIGO</TableHead>
                                    <TableHead className="text-muted-foreground text-xs">QTD</TableHead>
                                    <TableHead className="text-muted-foreground text-xs">DESCRIÇÃO</TableHead>
                                    <TableHead className="text-muted-foreground text-xs">ORIGEM</TableHead>
                                    <TableHead className="text-muted-foreground text-xs">VALOR</TableHead>
                                    <TableHead className="text-muted-foreground text-xs">VALIDADE</TableHead>
                                    <TableHead className="text-muted-foreground text-xs">STATUS</TableHead>
                                    <TableHead className="text-muted-foreground text-xs">AÇÃO</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {paginatedProducts.map((product) => {
                                    const expired = isExpired(product.validity);
                                    const statusBadge = getStatusBadge(expired);
                                    const ref = product.refProduct;
                                    const origin = product.origin;
                                    const originName = `${origin?.origin || ""} - ${origin?.cpf_cnpj_origin || ""} ${origin?.SEI_process ? `(${origin.SEI_process})` : ""}`;
                                    return (
                                        <TableRow key={product.id}>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <Package className="h-4 w-4 text-orange-500" />
                                                    <span className="font-medium">
                                                        {ref?.brand ? `${ref.brand}` : ref?.description ?? "-"}
                                                    </span>
                                                </div>
                                            </TableCell>
                                            <TableCell>{ref?.gtin ?? "-"}</TableCell>
                                            <TableCell>{product.quantity ?? 0}</TableCell>
                                            <TableCell className="max-w-xs truncate">
                                                {ref?.description ?? "-"}
                                            </TableCell>
                                            <TableCell>{originName}</TableCell>
                                            <TableCell>{formatValue(ref?.avg_price ?? null)}</TableCell>
                                            <TableCell>
                                                {product.validity
                                                    ? new Date(product.validity).toLocaleDateString("pt-BR", {
                                                          day: "2-digit",
                                                          month: "2-digit",
                                                          year: "numeric",
                                                      })
                                                    : "-"}
                                            </TableCell>
                                            <TableCell>
                                                <span
                                                    className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${statusBadge.className}`}
                                                >
                                                    {statusBadge.text}
                                                </span>
                                            </TableCell>
                                            <TableCell>
                                                <div className="flex items-center gap-2">
                                                    <button
                                                        onClick={() => handleEdit(product)}
                                                        className="text-muted-foreground hover:text-foreground transition-colors"
                                                    >
                                                        <Pencil className="h-4 w-4" />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(product)}
                                                        className="text-muted-foreground hover:text-red-500 transition-colors"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </button>
                                                </div>
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                            </TableBody>
                        </Table>
                    )}
                </CardContent>
            </Card>

            {/* Paginação */}
            {products && products.length > 0 && (
                <div className="mt-4 flex items-center justify-between">
                    <button
                        disabled={page === 1 || isLoading}
                        onClick={() => setPage((p) => Math.max(p - 1, 1))}
                        className={clsx("rounded-md border px-3 py-1", {
                            "cursor-not-allowed": page === 1 || isLoading,
                            "cursor-pointer": page !== 1,
                        })}
                    >
                        Página anterior
                    </button>

                    <span>
                        Página {page} de {totalPages}
                    </span>

                    <button
                        disabled={isLoading || page >= totalPages}
                        onClick={() => {
                            if (page < totalPages) {
                                setPage((p) => p + 1);
                            }
                        }}
                        className={clsx("rounded-md border px-3 py-1", {
                            "cursor-not-allowed": isLoading || page >= totalPages,
                            "cursor-pointer": !(page >= totalPages),
                        })}
                    >
                        Próxima página
                    </button>
                </div>
            )}
        </div>
    );
}
