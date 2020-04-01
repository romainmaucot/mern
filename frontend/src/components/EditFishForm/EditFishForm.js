import PropTypes from 'prop-types';
import React, { useState } from 'react';
import './EditFishForm.scss';
import axios from 'axios';

const EditFishForm = props => {
  const [fish, setFish] = useState(
    props.fish || {
      name: '',
      price: 0,
      status: 'available',
      desc: '',
      image: ''
    }
  );

  const handleChange = name => event => {
    let newFish = { ...fish };
    newFish[name] = event.target.value;
    setFish(newFish);
    props.updateFish(props.index, newFish);
  };

  function deleteFish(fish) {
    axios.delete('http://localhost:3000/fish/' + fish._id).then(response => console.log(response));
  }

  return (
    <div className='fish-edit'>
      <input type='hidden' name='id' value={fish._id} />
      <input type='text' name='name' onChange={handleChange('name')} value={fish.name} />
      <input type='text' name='price' onChange={handleChange('price')} value={fish.price} />
      <select type='text' name='status' onChange={handleChange('status')} value={fish.status}>
        <option value='available'>available</option>
        <option value='unavailable'>unavailable</option>
      </select>
      <textarea name='desc' onChange={handleChange('desc')} value={fish.desc} />
      <input type='text' name='image' onChange={handleChange('image')} value={fish.image} />
      <button onClick={() => deleteFish(fish)}>Remove fish</button>
    </div>
  );
};

EditFishForm.propTypes = {
  fish: PropTypes.shape({
    image: PropTypes.string,
    name: PropTypes.string,
    desc: PropTypes.string,
    status: PropTypes.string,
    price: PropTypes.number
  }),
  index: PropTypes.string,
  updateFish: PropTypes.func,
  deleteFish: PropTypes.func
};

export default EditFishForm;
