import React, { useState } from 'react';
import './Modal.css'; // باش نضيف الـ style في ملف CSS خارجي

function AdoptModal() {
  const [showModal, setShowModal] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // هنا تعمل API request أو تبعث البيانات
    alert("تم إرسال الطلب بنجاح!");
    setShowModal(false);
  };

  return (
    <>
      <button onClick={() => setShowModal(true)}>Adopt Now</button>

      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h2>طلب تبنّي</h2>
            <form onSubmit={handleSubmit}>
              <label>
                الاسم:
                <input type="text" required />
              </label>
              <label>
                البريد الإلكتروني:
                <input type="email" required />
              </label>
              <label>
                لماذا تريد التبني؟
                <textarea required />
              </label>
              <div className="modal-actions">
                <button type="submit">إرسال</button>
                <button type="button" onClick={() => setShowModal(false)}>إلغاء</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default AdoptModal;
