import React from 'react';

import './modal.scss';

const Modal = ({ closeEventBtn, handleChange, createBtn }) => (
  <div className="modal overlay">
    <div className="modal__content">
      <div className="create-event">
        <button className="create-event__close-btn" onClick={closeEventBtn}>
          +
        </button>
        <form className="event-form">
          <input type="text" name="title" placeholder="Title" className="event-form__field" />
          <div className="event-form__time">
            <input type="date" name="date" className="event-form__field" />
            <input
              type="time"
              name="startTime"
              className="event-form__field"
              onChange={handleChange}
            />
            <span>-</span>
            <input type="time" name="endTime" className="event-form__field" />
          </div>
          <textarea
            name="description"
            placeholder="Description"
            className="event-form__field"
          ></textarea>
          <button type="submit" className="event-form__submit-btn" onClick={createBtn}>
            Create
          </button>
        </form>
      </div>
    </div>
  </div>
);

// class Modal extends Component {
//   render() {
//     setTimeout(() => {
//       const createForm = document.querySelector('.event-form');
//       console.log(createForm);
//       const userData = Object.fromEntries(new FormData(createForm));
//       console.log(userData);
//     });
//     // const createForm = document.querySelector('.event-form');
//     // console.log(createForm);

//     // const userData = Object.fromEntries(new FormData(createForm));
//     // console.log(userData);

//     return (
//       <div className="modal overlay">
//         <div className="modal__content">
//           <div className="create-event">
//             <button className="create-event__close-btn" onClick={this.props.closeEventBtn}>
//               +
//             </button>
//             <form className="event-form">
//               <input type="text" name="title" placeholder="Title" className="event-form__field" />
//               <div className="event-form__time">
//                 <input type="date" name="date" className="event-form__field" />
//                 <input
//                   type="time"
//                   name="startTime"
//                   className="event-form__field"
//                   onChange={this.handleChange}
//                 />
//                 <span>-</span>
//                 <input type="time" name="endTime" className="event-form__field" />
//               </div>
//               <textarea
//                 name="description"
//                 placeholder="Description"
//                 className="event-form__field"
//               ></textarea>
//               <button type="submit" className="event-form__submit-btn">
//                 Create
//               </button>
//             </form>
//           </div>
//         </div>
//       </div>
//     );
//   }
// }

export default Modal;
