import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Topbar from '@/components/layout/Topbar';
import Footer from '@/components/layout/Footer';
import { getProductById, products } from '@/data/products';
import ProductDetailsContent from './ProductDetailsContent';
import { notFound } from 'next/navigation';

interface Props {
    params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const product = getProductById(params.id);

    if (!product) {
        return {
            title: 'Product Not Found | Ghar-Bazaar',
        };
    }

    return {
        title: `${product.name} | Ghar-Bazaar`,
        description: product.description.slice(0, 160),
        openGraph: {
            title: product.name,
            description: product.description,
            images: [product.thumbnail],
        },
    };
}

export default function ProductPage({ params }: Props) {
    const product = getProductById(params.id);

    if (!product) {
        notFound();
    }

    const jsonLd = {
        '@context': 'https://schema.org',
        '@type': 'Product',
        name: product.name,
        image: product.images,
        description: product.description,
        sku: product.sku,
        brand: {
            '@type': 'Brand',
            name: product.brand || 'Ghar-Bazaar',
        },
        offers: {
            '@type': 'Offer',
            url: `https://ghar-bazaar.com/product/${product.id}`,
            priceCurrency: product.currency,
            price: product.price,
            availability: product.stock > 0 ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
            seller: {
                '@type': 'Organization',
                name: product.supplier.name,
            },
        },
        aggregateRating: {
            '@type': 'AggregateRating',
            ratingValue: product.rating,
            reviewCount: product.reviewCount,
        },
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
            />
            <Topbar />
            <Header />
            <ProductDetailsContent product={product} />
            <Footer />
        </div>
    );
}

