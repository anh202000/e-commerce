import Link from 'next/link'
import { useContext } from 'react'
import { DataContext } from '../../store/GlobalState'
import { addToCart } from '../../store/Actions'
import LikeBold from '../../public/likeBold'
import Like from '../../public/like'
import DisLikeBold from '../../public/DisLikeBold'
import Dislike from '../../public/dislike'
import Comment from '../../public/comment'

const ProductItem = ({ product, handleCheck }) => {
    const { state, dispatch } = useContext(DataContext)
    const { cart, auth } = state
    console.log(product, 'product')

    const golobalCheckDupicate = product.like.filter((item) => item.name.includes(auth?.user?.name))
    const golobalCheckDupicate_dislike = product.disLike.filter((item) => item.name.includes(auth?.user?.name))

    const componentInfo = () => {
        return (
            <div class="row d-flex justify-content-end mr-4 mb-2 py-2" style={{ flex: 3 }}>
                {
                    golobalCheckDupicate?.length > 0 ?
                        <span><LikeBold />{product?.like?.length}</span>
                        :
                        <span><Like />{product?.like?.length}</span>
                }

                <span class="mr-4" />

                {
                    golobalCheckDupicate_dislike?.length > 0 ?
                        <span><DisLikeBold />{product?.disLike?.length}</span>
                        :
                        <span><Dislike />{product?.disLike?.length}</span>
                }

                <span class="mr-4" />

                <span>
                    <Comment />
                    {product?.comment?.length}
                </span>
            </div>
        )
    }

    const userLink = () => {
        return (
            <>
                {componentInfo()}
                <Link href={`product/${product._id}`}>
                    <a className="btn btn-light border ml-5"
                        style={{ marginRight: '5px', paddingTop: '7px', flex: 1 }}>View</a>
                </Link>
                <button className="btn btn-light border"
                    style={{ marginLeft: '5px', flex: 1 }}
                    disabled={product.inStock === 0 ? true : false}
                    onClick={() => dispatch(addToCart(product, cart))} >
                    Buy
                </button>
            </>
        )
    }

    const adminLink = () => {
        return (
            <>
                {componentInfo()}

                <Link href={`create/${product._id}`}>
                    <a className="btn btn-light border ml-5"
                        style={{ marginRight: '5px', paddingTop: '7px', flex: 1 }}>Edit</a>
                </Link>
                <button className="btn btn-light border"
                    style={{ marginLeft: '5px', flex: 1 }}
                    data-toggle="modal" data-target="#exampleModal"
                    onClick={() => dispatch({
                        type: 'ADD_MODAL',
                        payload: [{
                            data: '', id: product._id,
                            title: product.title, type: 'DELETE_PRODUCT'
                        }]
                    })} >
                    Delete
                </button>
            </>
        )
    }

    return (
        <div className="card rounded shadow p-3" style={{ width: '32rem' }}>
            {/* <div className="card shadow p-3 mb-5 rounded" style={{ width: '36rem' }}></div> */}
            {
                auth.user && auth.user.role === 'admin' &&
                <input type="checkbox" checked={product.checked}
                    className="position-absolute"
                    style={{ height: '20px', width: '20px' }}
                    onChange={() => handleCheck(product._id)} />
            }
            
            <img className="card-img-top hover-overlay hover-zoom hover-shadow ripple" src={product.images[0].url} alt={product.images[0].url} />
            
            <div className="card-body">
                <h5 className="card-title text-capitalize" title={product.title}>
                    {product.title}
                </h5>

                <div className="row justify-content-between mx-0">
                    <h6 className="text-danger">${product.price}</h6>
                    {
                        product.inStock > 0
                            ? <h6 className="text-danger">In Stock: {product.inStock}</h6>
                            : <h6 className="text-danger">Out Stock</h6>
                    }
                </div>

                <p className="card-text" title={product.description}>
                    {product.description}
                </p>

                <div className="row justify-content-between mx-0">
                    {!auth.user || auth.user.role !== "admin" ? userLink() : adminLink()}
                </div>
            </div>
        </div>
    )
}


export default ProductItem