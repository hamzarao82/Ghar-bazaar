const ProductGrid = () => {
    const products = Array(8).fill(null).map((_, idx) => ({
        id: idx,
        name: `Product ${idx + 1}`,
        price: `$${(Math.random() * 100 + 10).toFixed(2)}`,
        image: '📦'
    }));

    return (
        <div className="grid grid-cols-4 gap-4">
            {products.map((product) => (
                <div key={product.id} className="bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition cursor-pointer border border-gray-100">
                    <div className="text-6xl text-center mb-4 flex justify-center items-center h-32 bg-gray-50 rounded-md">{product.image}</div>
                    <h4 className="font-semibold text-sm mb-2 text-gray-800">{product.name}</h4>
                    <div className="flex justify-between items-center">
                        <p className="text-gray-900 font-medium">{product.price}</p>
                        <button className="text-blue-600 text-sm font-medium hover:underline">View</button>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default ProductGrid;
