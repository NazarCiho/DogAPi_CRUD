import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios';

interface Dog {
  _id: string;
  name: string;
  breed: string
  color: string;
  age: number;
  image: string;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
}

const Main = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [dogs, setDogs] = useState<Dog[]>([])

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            setIsAuthenticated(true)
            fetchDogs()
        }
        
    }, []);

    const fetchDogs = async () => {
      try {
          const token = localStorage.getItem('token');
          console.log('User token:', token)
          const response = await axios.get('https://dogs.kobernyk.com/api/v1/dogs', {
              headers: {
                  "Authorization": `Bearer ${token}`
              },
              params: {
                  limit: 10,
                  sort: 'name'
              }
          });
          
          setDogs(response.data)
      } catch (error: any) {
          console.error('Помилка отримання спису собак:', error);
      }
  };

    const handleDelete = async (dogId: string) => {
        try {
            const token = localStorage.getItem('token')
            await axios.delete(`https://dogs.kobernyk.com/api/v1/dogs/${dogId}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            fetchDogs();
        } catch (error: any) {
            console.error('Помилка видалення собаки:', error)
        }
    }

    if (!isAuthenticated) {
        return (
            <div>
                <p>Для перегляду списку собак <Link to="/login">авторизуйтесь</Link></p>
            </div>
        )
    }
    function logout() {
      localStorage.removeItem('token')
      setIsAuthenticated(false)
    }
    return (
      <div>
        <button onClick={logout}>Вийти</button>
          <h1>Список собак</h1>
          <Link to="/add-dog">
            <button >Додати нову собаку</button>
          </Link>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                  <tr>
                      <th style={tableHeaderStyle}>Ім'я</th>
                      <th style={tableHeaderStyle}>Порода</th>
                      <th style={tableHeaderStyle}>Колір</th>
                      <th style={tableHeaderStyle}>Вік</th>
                      <th style={tableHeaderStyle}>Зображення</th>
                      <th style={tableHeaderStyle}>Дії</th>
                  </tr>
              </thead>
              <tbody>
                  {dogs.map(dog => (
                      <tr key={dog._id}>
                          <td style={tableCellStyle}>{dog.name}</td>
                          <td style={tableCellStyle}>{dog.breed}</td>
                          <td style={tableCellStyle}>{dog.color}</td>
                          <td style={tableCellStyle}>{dog.age}</td>
                          <td style={tableCellStyle}>
                              <img src={dog.image} alt={dog.name} style={{ width: '50px', height: '50px' }} />
                          </td>
                          <td style={tableCellStyle}>
                                <Link to={`/edit-dog/${dog._id}`}>
                                  <button 
                                      style={{
                                          backgroundColor: '#4CAF50',
                                          color: 'white',
                                          border: 'none',
                                          padding: '5px 10px',
                                          borderRadius: '4px',
                                          cursor: 'pointer',
                                          marginRight: '5px'
                                      }}
                                  >
                                      Редагувати
                                  </button>
                              </Link>
                              <button 
                                  onClick={() => handleDelete(dog._id)}
                                  style={{
                                      backgroundColor: '#ff4444',
                                      color: 'white',
                                      border: 'none',
                                      padding: '5px 10px',
                                      borderRadius: '4px',
                                      cursor: 'pointer'
                                  }}
                              >
                                  Видалити
                              </button>
                          </td>
                      </tr>
                  ))}
              </tbody>
          </table>
      </div>
  )
}

const tableHeaderStyle = {
    backgroundColor: '#f2f2f2',
    padding: '12px',
    borderBottom: '1px solid #ddd',
    textAlign: 'left' as const
};

const tableCellStyle = {
    padding: '8px',
    borderBottom: '1px solid #ddd'
};

export default Main;
