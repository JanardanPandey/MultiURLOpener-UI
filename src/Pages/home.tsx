import { useState } from 'react'
import Modal from '../Modal';
import AddURLForm from '../AddURLForm';
import { useNavigate } from 'react-router-dom';

function home() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <button
        onClick={() => setIsModalOpen(true)}
        className="px-4 py-2 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700"
      >
        Open Modal
      </button>
      <button onClick={() => navigate("/multi-url")}>
        Open URL Tabs
      </button>

      <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
        {isModalOpen ? <AddURLForm /> : null}
      </Modal>
    </div>
  );

}

export default home