import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';
import LabelWithInput from './LabelWithInput';

const EditDog = () => {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [dog, setDog] = useState({
        name: '',
        breed: '',
        color: '',
        age: '',
        image: ''
    });
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchDog = async () => {
            try {
                const token = localStorage.getItem('token');
                const response = await axios.get(`https://dogs.kobernyk.com/api/v1/dogs/${id}`, {
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                setDog(response.data);
            } catch (error: any) {
                console.error('Помилка завантаження даних собаки:', error);
            }
        };
        fetchDog();
    }, [id]);

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setError('');

        try {
            const token = localStorage.getItem('token');
            await axios.put(`https://dogs.kobernyk.com/api/v1/dogs/${id}`, dog, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            navigate('/');
        } catch (error: any) {
            setError(error.response?.data?.message || 'Помилка оновлення даних собаки');
            console.error('Error updating dog:', error);
        }
    };

    const handleChange = (field: string, value: string) => {
        setDog(prevDog => ({ ...prevDog, [field]: value }));
    };

    return (
        <div>
            <h2>Редагувати дані собаки</h2>
            <Link to="/">
                <button>Назад до списку</button>
            </Link>
            <form onSubmit={handleSubmit}>
                <LabelWithInput
                    type="text"
                    labelText="Ім'я"
                    name="name"
                    value={dog.name}
                    onChange={(value) => handleChange('name', value)}
                />
                <LabelWithInput
                    type="text"
                    labelText="Порода"
                    name="breed"
                    value={dog.breed}
                    onChange={(value) => handleChange('breed', value)}
                />
                <LabelWithInput
                    type="text"
                    labelText="Колір"
                    name="color"
                    value={dog.color}
                    onChange={(value) => handleChange('color', value)}
                />
                <LabelWithInput
                    type="number"
                    labelText="Вік"
                    name="age"
                    value={dog.age}
                    onChange={(value) => handleChange('age', value)}
                />
                <LabelWithInput
                    type="url"
                    labelText="Посилання на фото"
                    name="image"
                    value={dog.image}
                    onChange={(value) => handleChange('image', value)}
                />
                {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
                <button type="submit">Оновити дані</button>
            </form>
        </div>
    );
};

export default EditDog;
