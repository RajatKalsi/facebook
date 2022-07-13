import { useState } from 'react';
import './UI.css';

const Filter = () => {
    const [year, setYear] = useState(new Date().getFullYear());
    const [month, setMonth] = useState(new Date().getMonth() + 1);
    const [date, setDate] = useState(new Date().getDate());

    const increased = () => {
        setYear(e => { return e + 1 });
    }
    const increased1 = () => {
        setMonth(e => { return e + 1 });
    }
    const increased2 = () => {
        setDate(e => { return e + 1 });
    }

    const decreased = () => {
        setYear(e => { return e - 1 });
    }
    const decreased1 = () => {
        setMonth(e => { return e - 1 });
    }
    const decreased2 = () => {
        setDate(e => { return e - 1 });
    }

    return (
        <>
            <div className='container color1 mt-4' data-bs-toggle="modal" data-bs-target="#myModal1">
                <div className='row font-size mt-2 p-3'>
                    <div className='col-2 ms-0 '><b>Posts</b></div>
                    <button className='col-2 bg-secondary ms-auto'>Filter</button>
                </div>
            </div>

            <div class="modal" id="myModal1">
                <div className="modal-dialog">
                    <div className="modal-content">

                        {/* <!-- Modal Header --> */}
                        <div className="modal-header">
                            <center>  <h4 className="modal-title">Post Filters</h4></center>
                            <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                        </div>

                        {/* <!-- Modal body --> */}
                        <div className="modal-body">
                            <b><p className="mb-0">Use filter to find your post on timeline</p></b>
                            <p className="">This will not effect how others see your posts</p>
                            <div className=''>
                                <div className=''>Go to:
                                    <span className="bg-secondary ms-4 "><button>{year}<i className="bi bi-caret-down-fill" onClick={increased}></i><i class="bi bi-caret-up-fill" onClick={decreased}></i></button></span>
                                    <span className="bg-secondary ms-4 "><button>{month}<i className="bi bi-caret-down-fill" onClick={increased1}></i><i class="bi bi-caret-up-fill" onClick={decreased1}></i></button></span>
                                    <span className="bg-secondary ms-4"><button>{date}<i className="bi bi-caret-down-fill" onClick={increased2}></i><i class="bi bi-caret-up-fill" onClick={decreased2}></i></button></span>

                                </div>
                            </div>
                        </div>

                        {/* <!-- Modal footer --> */}
                        <div className="modal-footer">
                            <button type="button" className="btn btn-primary rounded-pill w-100" data-bs-dismiss="modal">Done</button>
                        </div>

                    </div>
                </div>
            </div>
        </>
    )
}

export default Filter;