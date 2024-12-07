import { useState } from 'react';
import axios from 'axios';
import LabelWithInput from './LabelWithInput';
import { useNavigate, Link } from 'react-router-dom';

const AddDog = () => {
    const navigate = useNavigate();
    const [name, setName] = useState('');
    const [breed, setBreed] = useState('');
    const [color, setColor] = useState('');
    const [age, setAge] = useState('');
    const [image, setImage] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('');

        try {
            const token = localStorage.getItem('token');
            await axios.post('https://dogs.kobernyk.com/api/v1/dogs', 
                {
                    name,
                    breed,
                    color,
                    age: parseInt(age),
                    image
                },
                {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                }
            );

            navigate('/');
        } catch (error: any) {
            setError(error.response?.data?.message || 'Помилка при додаванні собаки');
            console.error('Error adding dog:', error);
        }
    };

    return (
        <div>
            <h2>Додати нову собаку</h2>
            <Link to="/">
                <button>Назад до списку</button>
            </Link>
            <form onSubmit={handleSubmit}>
                <LabelWithInput
                    type="text"
                    labelText="Ім'я"
                    name="name"
                    value={name}
                    onChange={setName}
                />
                <LabelWithInput
                    type="text"
                    labelText="Порода"
                    name="breed"
                    value={breed}
                    onChange={setBreed}
                />
                <LabelWithInput
                    type="text"
                    labelText="Колір"
                    name="color"
                    value={color}
                    onChange={setColor}
                />
                <LabelWithInput
                    type="number"
                    labelText="Вік"
                    name="age"
                    value={age}
                    onChange={setAge}
                />
                <LabelWithInput
                    type="url"
                    labelText="Посилання на фото"
                    name="image"
                    value={image}
                    onChange={setImage}
                />
                {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
                <button type="submit">Додати собаку</button>
            </form>
        </div>
    );
};

export default AddDog;
