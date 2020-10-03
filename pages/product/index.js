import { useRouter } from 'next/router'

 const ProductPage = () => {
    const router = useRouter()
    console.log("ROUTER QUERY ", router.query)
    const { productId } = router.query

    return (
        <div>Product: {productId} </div>
    )
}

export default ProductPage