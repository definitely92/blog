import { useState } from 'react';


function ModalLayout(props) {
    const [showForm, setShowForm] = useState(false);
    const [mText,setMText] = useState(props.text[props.textModal])
    const [mTitle,setMTitle] = useState(props.title[props.titleModal])

    const titleChange = (e) => {
        // props.setTitle([])
        // props.setTitle(e.target.value)
        setMTitle(e.target.value)
        
    }

    const textareaOnChange = (e) => {
        setMText(e.target.value);
    }

    const onSubmit = () => {
        setShowForm(false);
        let titlecopy = [...props.title]
        titlecopy[props.titleModal] = mTitle;
        props.setTitle(titlecopy);

        let textcopy = [...props.text]
        textcopy[props.textModal] = mText;
        props.setText(textcopy);
    }


  return (
    <div className='modal'>
        <div className='modal_body'>
            <button className='close' onClick={() => {
                props.setShowModal(!props.showModal)
            }}>닫기</button>
            { showForm == true ? 
                <form onSubmit={onSubmit}>
                    <p>{props.date}</p>
                    <p>
                        <input type='text' onChange={titleChange} value={mTitle}/>
                    </p>
                    <p>
                        <textarea onChange={textareaOnChange} value={mText} placeholder='상세내용을 입력하세요'/>
                    </p>
                    <button type='submit'>반영</button>
                </form>
                :
                <>
                <p>{props.date}</p>
                <h4>{props.title[props.titleModal]}</h4>
                <p>{props.text[props.textModal]}</p>
                <button onClick={()=>{
                    setShowForm(true);
                }}>내용 수정</button>
                </>
            }
         </div>
    </div>
  );
}


export default ModalLayout;