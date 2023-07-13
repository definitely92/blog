import { useEffect, useState } from "react";
import ModalLayout from "./Modal";

const List = () => {
    const [title, setTitle] = useState(['기본 글']);
    const [likeCount , setLikeCount] = useState([0])
    const [showModal, setShowModal] = useState(false);
    const [titleModal, setTitleModal] = useState(0);
    const [input, setInput] = useState('');
    const [date,setDate] = useState('');
    const [text,setText] = useState([]);
    const [textModal, setTextModal] = useState(0);

    const today = new Date();
    const dataString = today.toLocaleDateString('ko-KR',{
        year : 'numeric',
        month : 'long',
        day : 'numeric'
    })
    const dayName = today.toLocaleDateString('ko-KR',{weekday: 'long'})

    const handleInput = (e) => {
        setInput(e.target.value);
    }

    useEffect(()=> {
        setDate(dataString +' '+ dayName)
    },[])

    const onSubmit = (e) => {
        e.preventDefault();
        if( input ) {
            let copyTitle = [...title];
            let copyLike = [...likeCount];
            copyTitle.push(input);
            setTitle(copyTitle);
            setInput('');
            copyLike.push(0);
            setLikeCount(copyLike)
        } else {
            alert('글을 입력해주세요!')
        }
        if(text) {
            
        }
        setDate(dataString +' '+ dayName)
    }

    return (
        <>
        <div className="listTop">
            <form onSubmit={onSubmit}>
                <input type="text" value={input} onChange={handleInput} placeholder="글 입력 후 엔터키를 누르세요"/>
                <button type="submit">글 추가</button>
            </form>
            <button className="sortBtn" onClick={()=> {
                let copy = [...title];
                copy.sort();
                setTitle(copy)
            }}>가나다순 정렬</button>
        </div>
        <ul className="listWrap">
            {
                title.map((list,i) => {
                    return (
                        <div className='list' key={i}>
                            <h4>
                                <a onClick={() => {
                                    setShowModal(!showModal);
                                    setTitleModal(i);
                                    setTextModal(i);
                                }}>{title[i]} </a>
                                <span onClick={() => {
                                    let copy = [...likeCount];
                                    copy[i] = copy[i] + 1;
                                    setLikeCount(copy)
                                }}>👍 {likeCount[i]}</span>
                                
                            </h4>
                            <p className="context">
                                {text[i]}
                            </p>
                            <p className="date">
                                {date}
                            </p>
                            <button className="del" type="button" onClick={()=>{
                                let copyTitle = [...title];
                                let copyLike = [...likeCount];

                                copyTitle.splice(i,1);
                                setTitle(copyTitle);

                                copyLike.splice(i,1)
                                setLikeCount(copyLike)
                            }}>삭제</button>
                        </div>
                    )
                })
            }
        </ul>
        
        {
            showModal == true ? <ModalLayout textModal={textModal} text={text} setText={setText} showModal={showModal} setShowModal={setShowModal} date={date} titleModal={titleModal} title={title} setTitle={setTitle} likeCount={likeCount}/> : null
        }
        </>
    )
}

export default List;