interface SettingItemProps {
    title: string;
    description: string;
    children: React.ReactNode;
  }
  
export function SettingItem({ title, description, children }: SettingItemProps) {
    return (
      <div className="flex items-center justify-between py-4">
        <div className="flex-1 pr-4">
          <h3 className="text-sm font-medium text-gray-900">{title}</h3>
          <p className="text-sm text-gray-500 mt-1">{description}</p>
        </div>
        <div className="flex-shrink-0">{children}</div>
      </div>
    );
  }