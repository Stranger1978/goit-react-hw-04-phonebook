import { useState } from 'react';
import style from './ContactForm.module.css';


export default function ContactForm({ onSubmit })  {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const  handleChange = e => {
    const { name, value } = e.target;
      switch (name) {
        case 'name':
          setName(value);
          break;
      
        case 'number':
          setNumber(value);
          break;
        
        default:
          break;
      }
  };

  const handleSubmit = e => {
    e.preventDefault();
   
    onSubmit(name, number);
    reset();
    };
    
    const reset = () => {
    setName('')
    setNumber('')
    };
  
  return (
         <form onSubmit={handleSubmit} className={style.form}>
             <label className={style.form_label}>Name
          <input
            type="text"
            className={style.form_input}
            name="name"
            pattern="^[a-zA-Zа-яА-ЯІіЇїҐґ' \-\u0400-\u04FF]+$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onChange={handleChange}       
          />
        </label>
             <label className={style.form_label}>Number
          <input
            type="tel"
            className={style.form_input}
             name="number"
             pattern="\+?[0-9\s\-\(\)]+"
            //pattern="^[+]?[0-9\\.\\-\\s]{1,15}$"
            //pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}" 
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onChange={handleChange}         
          />
        </label>
             <button type='submit' className={style.form_button}>Add contact</button>
    </form>
      );
    };
    


