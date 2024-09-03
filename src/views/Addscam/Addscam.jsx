import React, { useRef, useState } from 'react'
import './Addscam.css';
import { useStateContext } from '../../contexts/contentprovider';
import { db, storage } from '../../contexts/firebaseSetup';
import { addDoc, collection } from 'firebase/firestore';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';


const Addscam = () => {

    const [showModal, setShowModal] = useState(false);
    const evidenceRef = useRef();
    const descriptionRef = useRef();
    const incidentdateRef = useRef();
    const contentRef = useRef();
    const platformRef = useRef();
    const imageRef = useRef();
    const categoryRef = useRef();
    const [errors, setErrors] = useState(null);
    const [selectedPlatform, setSelectedPlatform] = useState('');
    const [selectedCategory, setSelectedCategory] = useState('');

    const handlePlatformChange = (event) => {
        setSelectedPlatform(event.target.value);
    };

    const handleCategoryChange = (event) => {
        setSelectedCategory(event.target.value);
    };

    const handleConfirm = async (ev) => {
        ev.preventDefault();
        try {


            // Save scam data to Firestore
            const payload = {
                description: descriptionRef.current.value,
                date: incidentdateRef.current.value,
                evidence: evidenceRef.current.value,
                platform: platformRef.current.value,
                content: contentRef.current.value,
                category: categoryRef.current.value,
                status: 'verified',
            };

            const file = imageRef.current.files[0];
            let imageUrl = '';

            if (file) {
                try {
                    // Create a storage reference
                    const storageRef = ref(storage, `images/${file.name}`);
                    // Upload the file
                    await uploadBytes(storageRef, file);
                    // Get the file's URL
                    imageUrl = await getDownloadURL(storageRef);
                } catch (error) {
                    console.error('Error uploading file:', error);
                    // Handle file upload error
                    return;
                }
            }

            // Add image URL to the payload
            payload.image = imageUrl;

            // Add document to Firestore
            await addDoc(collection(db, 'ScamCollection'), payload);
            console.log('Document successfully written!');
            navigate('/scam'); // Redirect after successful submission
            showNotification();
        } catch (error) {
            console.error('Error adding document: ', error);
            setErrors({ general: ['An error occurred while adding the scam item.'] });
        }
        setShowModal(false);
    };

    const handleCancel = () => {
        setShowModal(false);
    };

    const showNotification = () => {
        const notification = document.getElementById('notification');
        notification.style.display = 'block';
        setTimeout(() => {
            notification.style.display = 'none';
        }, 3000);
    };

    const onSubmit = (ev) => {
        ev.preventDefault();
        setShowModal(true);
    };

    return (
        <div className='form-containers'>
            <div className="intros">
                <h1>Ajouter nouvelle arnaque identifie</h1>
            </div>
            <form className="request-forms" onSubmit={onSubmit}>
                {errors && <div className='alert'>
                    {Object.keys(errors).map(key => (
                        <p key={key}>{errors[key][0]}</p>
                    ))}
                </div>}
                <div className="mb-3">
                    <label htmlFor="incidentDate" className="form-label">Date de l'Incident:</label>
                    <input ref={incidentdateRef} type="date" id="incidentDate" name="incidentdate" className="form-controls" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="platform" className="form-label">Platform:</label>
                    <select
                        className="form-select"
                        value={selectedPlatform}
                        onChange={handlePlatformChange}
                        ref={platformRef}
                        aria-label="Default select example"
                    >
                        <option value="">Sélectionnez une platforme</option>
                          <option value="Whatsapp">Whatsapp</option>
                          <option value="Telegramme">Telegramme</option>
                          <option value="Facebook">Facebook</option>
                          <option value="Appels">Appels</option>
                          <option value="Appels">Message</option>
                          <option value="Appels">Instagram</option>
                          <option value="Appels">Email</option>
                          <option value="Appels">Autres</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="category" className="form-label">Categorie:</label>
                    <select
                        className="form-select"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        ref={categoryRef}
                        aria-label="Default select example"
                    >
                        <option value="">Sélectionnez une categorie de cybercrime</option>
                        <option value="Escroquerie">Escroquerie</option>
                        <option value="Cyberharcelement">Cyberharcelement</option>
                        <option value="Cyberviolence">Cyberviolence</option>
                        <option value="Cyberdiscipline">Cyberdiscipline</option>
                        <option value="Cyberintimidation">Cyberdintimidation</option>
                        <option value="Autres">Autres</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Introduction:</label>
                    <textarea ref={descriptionRef} id="description" name="description" className="form-controls" rows="5" required></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="content" className="form-label">Description de l'Escroquerie:</label>
                    <textarea ref={contentRef} id="content" name="content" className="form-controls" rows="5" required></textarea>
                </div>
                <div className="mb-3">
                    <label htmlFor="evidence" className="form-label">Preuves (Liens, textes etc.)</label>
                    <input ref={evidenceRef} type="text" className="form-controls" id="evidence" placeholder="" required />
                </div>
                <div className="mb-3">
                    <label htmlFor="image" className="form-label">Preuves (Captures d'écran, etc.)</label>
                    <div className="input-group">
                        <input ref={imageRef} type="file" className="form-controls" id="image" aria-describedby="inputGroupFileAddon04" aria-label="Upload" />
                    </div>
                </div>
                <div className="mb-3">
                    <button type="submit" className="submit-button">Envoyer</button>
                </div>
            </form>

            {/* Modal */}
            {showModal && (
                <div id="confirmationModal" className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={handleCancel}>&times;</span>
                        <p>Are you sure you want to submit this alert?</p>
                        <button id="confirmBtn" onClick={handleConfirm}>OK</button>
                        <button id="cancelBtn" onClick={handleCancel}>No</button>
                    </div>
                </div>
            )}

            {/* Notification */}
            <div id="notification" className="notification">Témoignage partagé avec succes !</div>
        </div>
    );
}


export default Addscam