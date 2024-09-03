import React, { useRef, useState } from 'react'
import './CreateFak.css'
import axiosClient from '../../axios-client';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { addDoc, collection } from 'firebase/firestore';
import { db, storage } from '../../contexts/firebaseSetup';

const CreateFak = () => {

    const categoryRef = useRef();
    const imageRef = useRef();
    const [selectedCategory, setSelectedCategory] = useState('');
   
    const [formData, setFormData] = useState({
        titre: '',
        intro: '',
        T1: '',
        T2: '',
        T3: '',
        T4: '',
        T5: '',
        T6: '',
        T7: '',
        T8: '',
        T9: '',
        T10: '',
        p1: '',
        p2: '',
        p3: '',
        p4: '',
        p5: '',
        p6: '',
        p7: '',
        p8: '',
        p9: '',
        p10: '',
        image: '',
        categorie: '',
        conclusion: '',
    });

    const handleCategoryChange = (event) => {
        const selectedValue = event.target.value;
        setSelectedCategory(selectedValue);
        setFormData((prevData) => ({
            ...prevData,
            categorie: selectedValue,
        }));
    };

    const handleChange = (event) => {
        const { name, value, type, files } = event.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: type === 'file' ? files[0] : value,
        }));
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
  
        const file = imageRef.current.files[0];
        let imageUrl = "";
      
        if (file) {
          const storageRef = ref(storage, `images/${file.name}`);
          await uploadBytes(storageRef, file);
          imageUrl = await getDownloadURL(storageRef);
        }
      
        try {
          await addDoc(collection(db, "FakCollection"), {
            ...formData,
            image: imageUrl,
            createdAt: new Date()
          });
      
          console.log("Document successfully written!");
        } catch (error) {
          console.error("Error adding document: ", error);
        }
    };


    return (
        <div>
            <form onSubmit={handleSubmit} className='form-container'>
                <div>
                    <label htmlFor="titre">Title:</label>
                    <input type="text" id="titre" name="titre" value={formData.titre} onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor="intro">Intro:</label>

                    <textarea id="intro" name="intro" value={formData.intro} onChange={handleChange} />
                </div>
                <div className="mb-3">
                    <label className="form-label">Image</label>
                    <input
                        ref={imageRef}
                        type="file"
                        
                        // Ensure the id matches the label's for attribute
                    />
                </div>

                <div >
                    <label htmlFor="platform" >Categorie:</label>
                    <select
                        id="categorie"
                        name="categorie"
                        value={selectedCategory}
                        onChange={handleCategoryChange}
                        ref={categoryRef}
                        aria-label="Default select example"
                    >
                        <option value="">Sélectionnez une categorie de cybercrime</option>
                        <option value="Escroquerie">Escroquerie</option>
                        <option value="Cyberharcelement">Cyberharcelement</option>
                        <option value="Catfish">Catfish</option>
                        <option value="Cyberdiscipline">Cyberdiscipline</option>
                        <option value="Cyberintimidation">Cyberdintimidation</option>
                        <option value="Cyberintimidation">Equipements</option>
                        <option value="Autres">Autres</option>
                    </select>
                </div>
                <div>
                    <label htmlFor="T1">T1:</label>

                    <textarea id="T1" name="T1" value={formData.T1} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="p1">p1:</label>

                    <textarea id="p1" name="p1" value={formData.p1} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="T2">T2:</label>

                    <textarea id="T2" name="T2" value={formData.T2} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="p2">p2:</label>

                    <textarea id="p2" name="p2" value={formData.p2} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="T3">T3:</label>

                    <textarea id="T3" name="T3" value={formData.T3} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="p3">p3:</label>

                    <textarea id="p3" name="p3" value={formData.p3} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="T4">T4:</label>

                    <textarea id="T4" name="T4" value={formData.T4} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="p4">p4:</label>

                    <textarea id="p4" name="p4" value={formData.p4} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="T5">T5:</label>

                    <textarea id="T5" name="T5" value={formData.T5} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="p5">p5:</label>

                    <textarea id="p5" name="p5" value={formData.p5} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="T6">T6:</label>

                    <textarea id="T6" name="T6" value={formData.T6} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="p6">p6:</label>

                    <textarea id="p6" name="p6" value={formData.p6} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="T7">T7:</label>

                    <textarea id="T7" name="T7" value={formData.T7} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="p7">p7:</label>

                    <textarea id="p7" name="p7" value={formData.p7} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="T8">T8:</label>

                    <textarea id="T8" name="T8" value={formData.T8} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="p8">p8:</label>

                    <textarea id="p8" name="p8" value={formData.p8} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="T9">T9:</label>

                    <textarea id="T9" name="T9" value={formData.T9} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="p9">p9:</label>

                    <textarea id="p9" name="p9" value={formData.p9} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="T10">T10:</label>

                    <textarea id="T10" name="T10" value={formData.T10} onChange={handleChange} />
                </div>
                <div>
                    <label htmlFor="p10">p10:</label>

                    <textarea id="p10" name="p10" value={formData.p10} onChange={handleChange} />
                </div>


                {/* ... other fields */}
                <div>
                    <label htmlFor="conclusion">Conclusion:</label>
                    <textarea id="conclusion" name="conclusion" value={formData.conclusion} onChange={handleChange} />
                </div>
                <button type="submit">Submit</button>
            </form>
        </div>
    )


}

export default CreateFak