import { Switch } from "@/components/ui/switch";

export function SwitchItem({ label, description, value, onChange }: {
    label: string;
    description?: string;
    value: boolean;
    onChange: (v: boolean) => void;
}) {
    return (
        <div className="flex justify-between items-center py-2 border-b last:border-b-0">
            <div>
                <p className="font-medium">{label}</p>
                {description && (
                    <p className="text-sm text-gray-600">{description}</p>
                )}
            </div>

            <Switch checked={value} onCheckedChange={onChange} />
        </div>
    );
}