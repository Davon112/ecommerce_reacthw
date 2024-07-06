import React, { useState, useEffect } from 'react';

const LoginForm = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [loginError, setLoginError] = useState('');
    const [users, setUsers] = useState([]);

    useEffect(() => {
        
        fetch('https://fakestoreapi.com/users')
            .then(response => response.json())
            .then(data => setUsers(data))
            .catch(error => console.error('Error fetching users:', error));
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const user = users.find(user => user.email === formData.email);

        if (user && user.password === formData.password) {
            console.log('Login successful:', user);
        
            setLoginError('');
        } else {
            console.error('Login error: Invalid credentials');
            setLoginError('Invalid credentials. Please try again.');
        }

        
        setFormData({
            email: '',
            password: ''
        });
    };

    return (
        <section className="text-gray-600 body-font">
            <div className="container px-5 py-24 mx-auto">
                <div className="flex flex-col text-center w-full mb-12">
                    <h1 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">User Login</h1>
                    <p className="lg:w-2/3 mx-auto leading-relaxed text-base">Please enter your email and password to login.</p>
                </div>
                <form onSubmit={handleSubmit} className="flex lg:w-2/3 w-full sm:flex-row flex-col mx-auto px-8 sm:space-x-4 sm:space-y-0 space-y-4 sm:px-0 items-end">
                    <div className="relative flex-grow w-full">
                        <label htmlFor="email" className="leading-7 text-sm text-gray-600">Email</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-transparent focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            required
                        />
                    </div>
                    <div className="relative flex-grow w-full">
                        <label htmlFor="password" className="leading-7 text-sm text-gray-600">Password</label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            className="w-full bg-gray-100 bg-opacity-50 rounded border border-gray-300 focus:border-red-500 focus:bg-transparent focus:ring-2 focus:ring-red-200 text-base outline-none text-gray-700 py-1 px-3 leading-8 transition-colors duration-200 ease-in-out"
                            required
                        />
                    </div>
                    <button type="submit" className="text-white bg-red-500 border-0 py-2 px-8 focus:outline-none hover:bg-red-600 rounded text-lg">Login</button>
                </form>
                {loginError && <p className="text-red-500 text-center mt-4">{loginError}</p>}
            </div>
        </section>
    );
};

export default LoginForm;
