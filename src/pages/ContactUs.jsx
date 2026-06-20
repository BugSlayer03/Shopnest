import './index.css'

export function ContactUs() {
    return (
        <div className="contact-us">
            <h1>Contact Us</h1>

            <div className='common'>
                <input type="text" placeholder="Name" required/>
            </div>

            <div className='common'>
                <input type="text" placeholder="Mobile Number" required/>
            </div>

            <div className='common'>
                <input type="email" placeholder="Email" required/>
            </div>

            <div className='common'>
                <textarea type="text" placeholder="Message.."></textarea>
            </div>

            <button className="contact-btn">
                Send Message
            </button>
        </div>
    );
}