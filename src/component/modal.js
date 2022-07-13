import img1 from './images/galary.png';
import './UI.css';
import { useEffect, useState } from 'react';
import axios from 'axios';

const Modal = ({ getApi }) => {
    const [image, setImage] = useState("")
    const [post, setPost] = useState("");


    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('file', image);
        let apiRes = await axios.post(`http://139.59.47.49:4004/api/upload/image`, formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            }
        });

        let data = apiRes.data
        let filename = data.filename
        console.log(filename)
        await handlePost(filename);

        getApi(1);

    }

    const handlePost = async (filename) => {
        let res = await axios.post(`http://139.59.47.49:4004/api/post`, {
            background: filename,
            post: post
        })
        // getApi();

        setImage("")
        setPost("")
    }
    return (
        <>
            <div className='col-12 p-3 m-1' data-bs-toggle="modal" data-bs-target="#myModal" >
                <span className='me-2'><img src="https://c1.10times.com/user/images/7/1/5/25396715_1632983767.jpg" alt="" className='rounded-circle' height="50px" width="50px" /></span>
                <input type="text" placeholder="What's on your mind" className='ms-3 rounded-pill bg-light w-75 border border-2' />
            </div>

            <div className="modal" id="myModal">
                <div className="modal-dialog">
                    <div className="modal-content font">

                        <div className="modal-header">
                            <h4 className="modal-title text-center">Create Post</h4>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        <form onSubmit={(e) => { e.preventDefault(); handleSubmit() }}>
                            <div className="modal-body">
                                <div className='row' style={{ height: "250px" }}>
                                    <div className='col-2 ms-3'><img src="https://c1.10times.com/user/images/7/1/5/25396715_1632983767.jpg" alt="" className='rounded-circle' height="50px" width="50px" /></div>
                                    <div className=' col-3 font-size mt-2 '><b>Jerry Luis</b></div>
                                    <div className='col-6 font-size text-end mt-2'>
                                        <div class="form-group"  >
                                            <img src={img1} alt="" height="40px" width="40px" onClick={() => document.getElementById('selectFileInput').click()} />
                                            <input type="file" id='selectFileInput' onChange={(e) => setImage(e.target.files[0])}
                                                accept="image/*" style={{ display: "none" }} />
                                        </div>
                                    </div>
                                    <div className="text-start">
                                        <img src={image ? URL.createObjectURL(image) : ""} className='postimage w-100' height="210px" width="550px" alt="" name='image' ></img>
                                        <input type="text" name="post" value={post} placeholder='Start Typing' className='textonImg' onChange={(e) => { setPost(e.target.value) }} />
                                    </div>
                                </div>
                            </div>

                            <div className="modal-footer">
                                <button type="submit" className="btn btn-primary w-100 rounded-pill" >Post</button>
                            </div>

                        </form>
                    </div>
                </div>
            </div >
        </>
    )
}

export default Modal;