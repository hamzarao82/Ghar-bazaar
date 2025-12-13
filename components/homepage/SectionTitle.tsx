interface SectionTitleProps {
    title: string;
}

const SectionTitle = ({ title }: SectionTitleProps) => {
    return (
        <h3 className="text-2xl font-bold mb-6 text-gray-800">
            {title}
        </h3>
    );
};

export default SectionTitle;
