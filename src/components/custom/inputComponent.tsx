interface InputComponentProps {
    children: React.ReactNode;
    title: string;
    isRequired?: boolean;
    isVertical?: boolean;
    isOption?: boolean;
    colorText?: string; // Tambahkan prop untuk menentukan warna teks
}

export default function InputComponent({
    isRequired,
    title,
    children,
    isOption,
    isVertical,
    colorText = "text-black", // Default warna teks hitam
}: InputComponentProps) {
    if (isVertical) {
        return (
            <div className="space-y-2">
                <h4 className={`font-medium ${colorText}`}>
                    {title}
                    {isRequired && (
                        <span className="text-error-700 text-sm -mt-4">*</span>
                    )}
                </h4>
                {children}
            </div>
        );
    }

    if (isOption) {
        return (
            <div className="flex items-center space-x-2">
                <h4 className={`w-4/12 font-medium ${colorText}`}>
                    {title}
                    {isRequired && (
                        <span className="text-error-700 text-sm -mt-4">*</span>
                    )}
                </h4>
                {children}
            </div>
        );
    }

    return (
        <div className="flex items-center justify-between space-x-2">
            <h4 className={`w-1/2 font-medium ${colorText}`}>
                {title}
                {isRequired && (
                    <span className="text-error-700 text-sm -mt-4">*</span>
                )}
            </h4>
            {children}
        </div>
    );
}
