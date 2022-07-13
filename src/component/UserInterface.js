import React, { useEffect, useState } from 'react';
import './UI.css';
import Modal from './modal';
import Filter from './Filter';
import axios from 'axios';
import img1 from './images/galary.png';
import { useParams } from 'react-router-dom';





const UserInterface = () => {

    // let filename;

    const [date, setDate] = useState("");
    const [data, setData] = useState("");
    const [image, setImage] = useState("");
    const [post, setPost] = useState("");
    const [detailImage, setDetailImage] = useState("")

    const [page, setPage] = useState(1)
    const [counter, setCounter] = useState(1)
    const [show, setShow] = useState(true)


    let url = "http://139.59.47.49:4004/api/posts"
    let url1 = "http://139.59.47.49:4004/api"

    const getApi = async (page) => {
        let res = await axios.get(`${url}?limit=${10}&start=${page}&orderby=0`)
        setData(res.data)
        setPage(page)
    }

    const disabled = (page) => {
        if (getApi(page) === 0) {
            setShow(false)
        }
        else {
            setShow(true)
        }
    }

    useEffect(() => {
        getApi(1);
    }, [])

    const handleSubmit = async (id) => {
        const formData = new FormData();
        formData.append('file', detailImage);
        let apiRes = await axios.post(`${url1}/upload/image`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });

        let data = apiRes.data
        let filename = data.filename
        await handleUpdate(id, filename);
        getApi(1);

    }

    const FilterPost = async () => {
        let apires = await axios.get(`${url}?limit=10&start=1&date=${date}&orderby=0`)
        setData(apires.data)
        // getApi(1)
    }

    const DeletePost = async (id) => {
        let Apires = await axios.delete(`${url1}/post/delete/${id}`)
        setData(Apires.data);
        getApi(1);
    }

    const DetailPost = async (id) => {
        let res = await axios.get(`${url1}/post/${id}`)
        setPost(res.data.post)
        setImage(res.data.background);
    }

    const handleUpdate = async (id, filename) => {
        let res = await axios.put(`${url1}/post`, {
            id: id,
            background: filename,
            post: post
        })
        getApi(1)
        setDetailImage("")
        setPost("")
    }

    return (
        <>
            <div className="container">
                <nav className="navbar navbar-expand-sm bg-light font ">
                    <div className="container-fluid">
                        <span className="navbar-brand" alt="" href="hello">Facebook</span>
                        <ul className="navbar-nav m-1 ">
                            <li className="nav-item me-4 mt-2">Home</li>
                            <li className="nav-item me-4 mt-2">Profile</li>
                            <li className="nav-item me-4 mt-2">Contact</li>
                            <li className="nav-item me-4 mt-2">Setting</li>
                            <li className="nav-item me-4"><burron className="btn btn-success rounded-pill">Log-In</burron></li>
                        </ul>
                    </div>
                </nav>
                <div className='container'>
                    <div className='position-relative'>
                        <div className=' position-absolute top-100 start-50 translate-middle text-center'>
                            <img src="https://c1.10times.com/user/images/7/1/5/25396715_1632983767.jpg" className='rounded-circle ' height="180px" width="180px" alt="" />
                            <h4 className='mt-2'><b>Jeery Luis</b></h4>
                        </div>
                        <div className='text-center mt-3'>
                            <img src='https://images.emedicinehealth.com/images/article/main_image/diabetes-symptoms-women.jpg' alt="" />
                        </div>
                        <div className=' position-absolute top-100 start-50 translate-middle text-center'>
                            <img src="https://c1.10times.com/user/images/7/1/5/25396715_1632983767.jpg" className='rounded-circle ' height="180px" width="180px" alt="" />
                            <h4 className='mt-2'><b>Jeery Luis</b></h4>
                        </div>
                    </div>
                </div>
            </div>
            < div className='container-fluid' >
                <div className='text-center mt-5 pt-5'>
                    <h3 className='col-12 text-center  mt-5 pt-3 timeline'>Timeline</h3>
                </div>
            </div >
            <div className='container text-center mt-5 color'>
                <Modal getApi={getApi} />
            </div>
            <div className='container color1 mt-4'>
                <div className='container color1 mt-5' data-bs-toggle="modal" data-bs-target="#myModal1">
                    <div className='row font-size mt-4 p-3'>
                        <div className='col-2 ms-0 '><b>Posts</b></div>
                        <button className='col-2 bg-secondary ms-auto'>Filter</button>
                    </div>
                </div>
                <div class="modal" id="myModal1">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <center>  <h4 className="modal-title">Post Filters</h4></center>
                                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                            </div>
                            <div className="modal-body">
                                <b><p className="mb-0">Use filter to find your post on timeline</p></b>
                                <p className="">This will not effect how others see your posts</p>
                                <div className=''>
                                    <input type="date" onChange={(e) => { setDate(e.target.value) }} />
                                </div>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-primary rounded-pill w-100" onClick={FilterPost}>Done</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {
                Array.from(data).map((items, index) => {
                    return (
                        <>
                            <div className='container mt-5 color2' key={index} style={{}}>
                                <div className='row' style={{ height: "90px" }}>
                                    <div className='col-2 ms-3'><img src="https://c1.10times.com/user/images/7/1/5/25396715_1632983767.jpg" alt="" className='rounded-circle' height="70px" width="70px" /></div>
                                    <div className=' col-3 font mt-3 ms-2'><b>Jerry Luis {items.created_at}</b></div>
                                    <div className='col-6 font-size text-end mt-2' data-bs-toggle="modal" id="edit" data-bs-target={`#myModal2${items.id}`}><button>...</button></div>
                                    <div className="modal" id={`myModal2${items.id}`}>
                                        <div className="modal-dialog">
                                            <div className="modal-content">
                                                <div className="modal-header">
                                                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                                </div>
                                                <div className="modal-body">
                                                    <ul className="list-group">
                                                        <li className="list-group-item" data-bs-toggle="modal" data-bs-target={`#myModal5${items.id}`} onClick={() => { DetailPost(items.id); }}  ><button>Edit</button></li>
                                                        <li className="list-group-item" onClick={() => { DeletePost(items.id) }}><button>Delete {items.id}</button></li>
                                                    </ul>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                {/* update part */}
                                <div className='row image' >
                                    <img src={`http://139.59.47.49:4004/api/profile_image?profile_image=${items.background}`} className='w-100' height="210px" width="550px" alt={items.post}></img>
                                    <h2 className='text'>{items.post}</h2>
                                </div>
                                <div className="modal" id={`myModal5${items.id}`}>
                                    <div className="modal-dialog">
                                        <div className="modal-content font">
                                            <div className="modal-header">
                                                <h4 className="modal-title text-center">Create Post</h4>
                                                <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                                            </div>
                                            <form onSubmit={(e) => { e.preventDefault(); handleSubmit(items.id) }}>
                                                <div className="modal-body">{items.id}
                                                    <div className='row' style={{ height: "250px" }}>
                                                        <div className='col-2 ms-3'><img src="https://c1.10times.com/user/images/7/1/5/25396715_1632983767.jpg" alt="" className='rounded-circle' height="50px" width="50px" /></div>
                                                        <div className=' col-3 font-size mt-2 '><b>Jerry Luis</b></div>
                                                        <div className='col-6 font-size text-end mt-2'>
                                                            <div class="form-group"  >
                                                                <img src={img1} alt="" height="40px" width="40px" onClick={() => document.getElementById('selectFileInput1').click()} />
                                                                <input type="file" id='selectFileInput1' onChange={(e) => setDetailImage(e.target.files[0])}
                                                                    accept="image/*" style={{ display: "none" }} />
                                                            </div>
                                                        </div>
                                                        <div className="text-start">
                                                            <img src={detailImage ? URL.createObjectURL(detailImage) : ""} className='postimage w-100' height="210px" width="550px" alt="" name='image' ></img>
                                                            <input type="text" name="post" value={post} placeholder='Start Typing' className='textonImg' onChange={(e) => { setPost(e.target.value) }} />
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="modal-footer">
                                                    <button type="submit" className="btn btn-primary w-100 rounded-pill">Update</button>
                                                </div>
                                            </form>
                                        </div>
                                    </div>
                                </div >
                            </div>
                        </>
                    )
                })
            }
            <div className='row mt-5'>
                <div className='col-4 m-auto '>

                    <nav aria-label="Page navigation example">
                        <ul class="pagination" onClick={(e) => { e.preventDefault() }}>
                            <li className="page-item"><a className="page-link me-5  bg-primary text-white" id="previous" href="hello" value={show} onClick={() => { page > 1 ? getApi(page - 1) : console.log() }} >Previous</a></li>
                            <li className="page-item "><a className="page-link ms-5 bg-primary text-white" href="hello" onClick={() => { getApi(page + 1) }}>Next</a></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </>
    )
}
export default UserInterface;

