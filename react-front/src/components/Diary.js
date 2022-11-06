import "../css/Diary.css"

const MAX_CHARS_BY_PAGES = 1666
//
function Diary() {

    let c = (
        <div className="diary">
            <textarea className="left-page"
            maxLength={MAX_CHARS_BY_PAGES}>

            </textarea>
            <textarea className="right-page"
            maxLength={MAX_CHARS_BY_PAGES}>
            

            </textarea>
            <div className="page-numbers">
                <span className='page-number left'>1</span>
                <span className='page-number right'>2</span>

            </div>
        </div>
    )

    return c
}

export default Diary