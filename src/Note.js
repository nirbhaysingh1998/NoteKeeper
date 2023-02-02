import React, { useState, useEffect } from 'react';
import pin from './Images/pin.svg'
import { MdDelete } from 'react-icons/md'
import { BsPlusCircleDotted } from 'react-icons/bs'


const getItem = () => {
    const list = localStorage.getItem('notes')
    if (list) {
        return JSON.parse(list);
    }
    else {
        return [];
    }
}
const Note = () => {
    const [data, setdata] = useState({ title: "", content: "" });
    const [notes, setnotes] = useState(getItem);
    //   const [update, setupdate] = useState('');
    const [onenable, setonenable] = useState(false);
    // const [loading, setloading] = useState(false);
    const addNote = () => {
        if (!data) {

        }
        else {
            setnotes([...notes, { data }]);
            console.log(notes)
            setdata({ title: "", content: "" })

        }
    }
    const enableonClick = () => {
        if (onenable) setonenable(true);
        else { setonenable(false) }
        console.log('i am working');
    }
    const AddNote = (event) => {
        //   const name = event.target.name;
        // const value = event.target.value;
        const { name, value } = event.target;
        setdata((prevData) => {
            return {
                ...prevData,
                [name]: value,

            };

        });
        console.log(data);

    }
    const deleteNote = (id) => {

        console.log(id)
        const updateitem = notes.filter((elem, ind) => {
            return ind !== id
        });
        setnotes(updateitem)

        //  setloading(true);
        // console.log(loading)


    }



    useEffect(() => {
        localStorage.setItem('notes', JSON.stringify(notes))
    }, [notes]);
    console.log(notes);
    return (
        <div>
            <div className=' p-5'>
                <div className='flex justify-center '>
                    <div className='grid grid-cols-1'>
                        <input name='title' value={data.title} className=' border-black bg-white shadow-lg p-2 focus:none ' placeholder='Title' type='text' onChange={(event) => AddNote(event)} />


                        <textarea rows="3" cols="50" name='content' className='bg-white shadow-lg p-2  ' placeholder='Content' value={data.content} onChange={(event) => { AddNote(event) }}>

                        </textarea>
                    </div>
                    <BsPlusCircleDotted color="secondary" onClick={addNote} className=' text-5xl cursor-pointer relative -left-8  top-20 z-10' />
                </div>
            </div>
            <div className=' p-5 '>
                < div className=' grid grid-cols-1 md:grid-cols-6 lg:grid-cols-4 lg:m-auto'>
                    {!notes ? <p> no notes present</p> : notes.map((curelm, index) => {
                        return (
                            <div className='flex  justify-center item-center p-3' key={index}>
                                <img src={pin} alt='nopin' className='h-8 z-10 relative top-2 left-10' />
                                <div >
                                    <p id={index} name="title" className='shadow-xl bg-orange-400 font-bold text-2xl rounded-t-xl    p-8 text-white  focus:outline-none focus:shadow-xl focus:aspect-[2/1] '>{!curelm.data.title ? "no title" : curelm.data.title}</p>
                                    <textarea name="content" disabled={onenable} type='text' id={index} value={!curelm.data.content ? "no content" : curelm.data.content}


                                        onDoubleClick={enableonClick} className='shadow-xl rounded-b-xl bg-orange-400 h-56 aspect-[1/0.75] p-8 text-white  focus:outline-none focus:shadow-xl focus:aspect-[2/1] focus:z-50' />
                                </div>
                                <MdDelete id={index} color="secondary" className=' text-2xl relative -left-8 top-2 hover:cursor-pointer' onClick={() => { deleteNote(index) }} />


                            </div>
                        );
                    })}






                </div>
            </div >
        </div >
    );
}

export default Note;
