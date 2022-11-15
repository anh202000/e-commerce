import React, { useContext, useEffect, useState } from "react"
import { useRef } from "react";
import Col from 'react-bootstrap/Col';
import Nav from 'react-bootstrap/Nav';
import Row from 'react-bootstrap/Row';
import Tab from 'react-bootstrap/Tab';
import { getData, postData } from "../utils/fetchData";
import emailjs from '@emailjs/browser';
import GoogleApiWrapper from '../components/googlemap/googlemap'
import { DataContext } from "../store/GlobalState";
import { sendMail } from "../store/Actions";

const LocationInfor = (props) => {
    const form = useRef();
    const [products, setProducts] = useState(props?.products?.map((item, idx) => {
        if (item?.comment?.length > 0) {
            return item?.comment
        } else {
            return delete props?.products[idx]
        }
    }))
    const { state, dispatch } = useContext(DataContext);

    const { mails, auth } = state
    
    useEffect(() => {
        setProducts(props?.products?.map((item) => {
            if (item?.comment?.length > 0) {
                return item?.comment
            } else {
                return delete props?.products[idx]
            }
        }))
    }, [props.products])

    const sendEmail = async (e) => {
        e.preventDefault();
        let res
        res = await postData('mail', {
            user_name: document.getElementById("user_name").value,
            email: document.getElementById("user_email").value,
            subject: document.getElementById("subject").value,
            message: document.getElementById("message").value
        }, auth.token)
        if (res.err) return dispatch({ type: 'NOTIFY', payload: { error: res.err } })
        dispatch({ type: "ADD_MAIL", payload: [...mails, res.newMail] })

        emailjs.sendForm('service_xk7oeuw', 'template_ku8ruto', form.current, 'Wh01UpU20lpfVqZ0k')
            .then((result) => {
                dispatch(sendMail())
                e.target.reset()
            }, (error) => {
                console.log(error.text);
            });
    };

    return (
        <Tab.Container id="left-tabs-example" defaultActiveKey="1">
            <Row>
                <Col sm={2}>
                    <Nav variant="pills">
                        <Nav.Item style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                            <Nav.Link eventKey="1">About us</Nav.Link>
                        </Nav.Item>
                        <Nav.Item style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                            <Nav.Link eventKey="2">How to checkout</Nav.Link>
                        </Nav.Item>
                        <Nav.Item style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                            <Nav.Link eventKey="3">How to return policy</Nav.Link>
                        </Nav.Item>
                        <Nav.Item style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                            <Nav.Link eventKey="4">Feedback & rating</Nav.Link>
                        </Nav.Item>
                        <Nav.Item style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                            <Nav.Link eventKey="5">Contact information</Nav.Link>
                        </Nav.Item>
                        <Nav.Item style={{ paddingTop: '10px', paddingBottom: '10px' }}>
                            <Nav.Link eventKey="6">Location</Nav.Link>
                        </Nav.Item>
                    </Nav>
                </Col>
                <Col sm={10}>
                    <Tab.Content>
                        <Tab.Pane eventKey="1">
                            {/* about us */}
                            <section class="mb-5">
                                <h2 class="h1-responsive font-weight-bold text-center my-5">About us</h2>
                                <p class="text-center w-responsive mx-auto mb-5">Youngz is the result of efforts to create a proud Vietnamese young fashion brand…</p>
                                <p class="text-center w-responsive mx-auto mb-5">Mr. Le Phan Tuan Anh is the General Director of the company, after graduating from FPT Greenwich in London, he decided to give up this bustling urban place to return to Da Nang because of his great love for the Central region. . When the country's economy was in the process of strong transformation, when Da Nang was still changing new colors, it was also the time when Youngz Style was officially established.</p>
                                <div className="text-center">
                                    <img class="w-responsive mx-auto mb-5" src={"https://img.freepik.com/free-vector/shop-with-sign-we-are-open_52683-38687.jpg?w=2000"} style={{ maxWidth: '550px' }} />
                                </div>
                            </section>
                        </Tab.Pane>
                        <Tab.Pane eventKey="2">
                            {/* How to checkout */}
                            <section class="mb-5">
                                <h2 class="h1-responsive font-weight-bold text-center my-5">How to checkout</h2>

                                <p class="text-center w-responsive mx-auto mb-5">Paypal card (bank card, domestic payment card)</p>
                                <p class="text-center w-responsive mx-auto mb-5">You pay directly at the payment system on the website after completing the order. Youngz's electronic payment system is connected to the Payment electronic payment gateway. Accordingly, Youngz's payment security standards ensure compliance with Payment's security standards, which have been assessed by the State Bank of Vietnam for safety and security and officially licensed to operate.</p>

                                <p class="w-responsive mx-auto mb-3">Example of unordered lists:</p>
                                <ul class="w-responsive mx-auto mb-5">
                                    <li>Account holder name: Le Phan Tuan Anh</li>
                                    <li>Account number: 11784588****</li>
                                    <li>Bank: TP BANK</li>
                                </ul>

                                <div className="text-center">
                                    <img class="w-responsive mx-auto mb-5" src={"https://i.pcmag.com/imagery/reviews/068BjcjwBw0snwHIq0KNo5m-15.fit_scale.size_1028x578.v1602794215.png"} style={{ maxWidth: '550px' }} />
                                </div>
                            </section>
                        </Tab.Pane>
                        <Tab.Pane eventKey="3">
                            {/* How to return policy */}
                            <section class="mb-5">
                                <h2 class="h1-responsive font-weight-bold text-center mt-5">How to return policy </h2>
                                <h5 class="h5-responsive font-weight-bold text-center my-5">PLEASE NOTE WHEN BUYING</h5>

                                <p class="text-center w-responsive mx-auto mb-5">If you have made a purchase and have unexpected problems when receiving or using the product and want to return it, please follow the notes below.</p>

                                <p class="w-responsive mx-auto mb-3">1. Conditions of return:</p>
                                <p class="w-responsive mx-auto mb-3">Customers need to check the condition of the goods and can exchange/return the goods at the time of delivery/receipt in the following cases:</p>
                                <ul class="w-responsive mx-auto mb-5">
                                    <li>Goods do not match the type and model in the ordered order or as on the website at the time of ordering.</li>
                                    <li>Not enough quantity, not enough set as in the order.</li>
                                    <li>External conditions are affected such as packaging tear, peeling, broken ...</li>
                                </ul>

                                <p class="w-responsive mx-auto mb-3">2. Regulations on the time to notify and send returned products</p>
                                <ul class="w-responsive mx-auto mb-5">
                                    <li>Time for notification of return and exchange: within 48 hours of receiving the product in case the product lacks accessories, gifts or is broken.</li>
                                    <li>Time to send and return the product: within 14 days of receiving the product.</li>
                                    <li>Product return location: Customers can bring the goods directly to our office/store or by post.</li>
                                </ul>
                            </section>
                        </Tab.Pane>
                        <Tab.Pane eventKey="4">
                            {/* feedback & rating */}
                            <section class="mb-5">
                                <h2 class="h1-responsive font-weight-bold text-center my-5">feedback and rating</h2>

                                <p class="text-center w-responsive mx-auto mb-5">There are all information about feedback of user, they rating the product value and something better.</p>
                                <p class="text-center w-responsive mx-auto mb-5">You pay directly at the payment system on the website after completing the order. Youngz's electronic payment system is connected to the Payment electronic payment gateway. Accordingly, Youngz's payment security standards ensure compliance with Payment's security standards, which have been assessed by the State Bank of Vietnam for safety and security and officially licensed to operate.</p>

                                <div class="card text-dark">
                                    {
                                        products[0]?.length > 0 ?
                                            products[0]?.map((item, index) => {
                                                if (item?.avatar?.length > 0) {
                                                    return (
                                                        <div class="card-body p-4 w-100">
                                                            <h4 class="mb-0">{index === Number(products[0]?.length - 1) && 'Recent comments'}</h4>
                                                            <p class="fw-light mb-4 pb-2">{index === Number(products[0]?.length - 1) && 'Latest Comments section by users'}</p>

                                                            <div class="d-flex flex-start">
                                                                <img class="rounded-circle shadow-1-strong me-3 mr-4"
                                                                    src={item?.avatar} alt="avatar" width="60"
                                                                    height="60" />
                                                                <div>
                                                                    <h6 class="fw-bold mb-1">{item?.name}</h6>
                                                                    <div class="d-flex align-items-center mb-3">
                                                                        <p class="mb-0">
                                                                            {item?.time}
                                                                        </p>
                                                                    </div>
                                                                    <p class="mb-0">
                                                                        {item?.comment}
                                                                    </p>
                                                                </div>
                                                            </div>
                                                            <div class="row mt-4 mb-2">
                                                                {
                                                                    item?.url?.length > 0 && item?.url?.map((img, index) => (
                                                                        <div class="col-lg-2 col-md-10 mb-4 mb-lg-0">
                                                                            <div
                                                                                key={index}
                                                                                class="my-1"
                                                                                data-ripple-color="light"
                                                                            >
                                                                                <img
                                                                                    src={img.url ? img.url : URL.createObjectURL(img)}
                                                                                    class="rounded"
                                                                                    height="120"
                                                                                    width="160"
                                                                                />
                                                                            </div>
                                                                        </div>
                                                                    ))
                                                                }
                                                            </div>
                                                        </div>
                                                    )
                                                }
                                            }).reverse()
                                            :
                                            <p class="mb-0">
                                                There are no question about this product, if you have a question or feedback, please ask us. Hope you have good experience in my store. Youngz Shop contact email: anhroyal110@gmail.com or phonenumber: 0962731***.
                                            </p>
                                    }
                                </div>
                            </section>
                        </Tab.Pane>
                        <Tab.Pane eventKey="5">
                            {/* Contact */}
                            <section class="mb-5">
                                <h2 class="h1-responsive font-weight-bold text-center my-5">Contact us</h2>
                                <p class="text-center w-responsive mx-auto mb-5">Do you have any questions? Please do not hesitate to contact us directly. Our team will come back to you within
                                    a matter of hours to help you.</p>

                                <div class="row">
                                    <div class="col-md-9 mb-md-0 mb-5">
                                        <form ref={form} onSubmit={sendEmail}>

                                            <div class="row">

                                                <div class="col-md-6">
                                                    <div class="md-form mb-0">
                                                        <input type="text" id="user_name" name="user_name" class="form-control" />
                                                        <label for="name" class="">Your name</label>
                                                    </div>
                                                </div>

                                                <div class="col-md-6">
                                                    <div class="md-form mb-0">
                                                        <input type="email" id="user_email" name="user_email" class="form-control" />
                                                        <label for="email" class="">Your email</label>
                                                    </div>
                                                </div>

                                            </div>

                                            <div class="row">
                                                <div class="col-md-12">
                                                    <div class="md-form mb-0">
                                                        <input type="text" id="subject" name="subject" class="form-control" />
                                                        <label for="subject" class="">Subject</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div class="row">
                                                <div class="col-md-12">

                                                    <div class="md-form">
                                                        <textarea type="text" id="message" name="message" rows="2" class="form-control md-textarea"></textarea>
                                                        <label for="message">Your message</label>
                                                    </div>

                                                </div>
                                            </div>
                                            <input type="submit" value="Send" />
                                        </form>


                                        <div class="status"></div>
                                    </div>

                                    <div class="col-md-3 text-center">
                                        <ul class="list-unstyled mb-0">
                                            <li><i class="fas fa-map-marker-alt fa-2x"></i>
                                                <p>Ngũ Hành Sơn, Đà Nẵng</p>
                                            </li>

                                            <li><i class="fas fa-phone mt-4 fa-2x"></i>
                                                <p>+84 962731***</p>
                                            </li>

                                            <li><i class="fas fa-envelope mt-4 fa-2x"></i>
                                                <p>Anhroyal110@gmail.com</p>
                                            </li>
                                        </ul>
                                    </div>

                                </div>

                            </section>
                        </Tab.Pane>
                        <Tab.Pane eventKey="6">
                            <GoogleApiWrapper />
                        </Tab.Pane>
                    </Tab.Content>
                </Col>
            </Row>
        </Tab.Container>
    )
}

export async function getServerSideProps({ query }) {
    const page = query.page || 1
    const category = query.category || 'all'
    const sort = query.sort || ''
    const search = query.search || 'all'

    const res = await getData(
        `product?limit=${page * 6}&category=${category}&sort=${sort}&title=${search}`
    )
    // server side rendering
    return {
        props: {
            products: res.products,
            result: res.result
        }, // will be passed to the page component as props
    }
}


export default LocationInfor