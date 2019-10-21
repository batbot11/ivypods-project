import axios from 'axios';

const googlePlacesAPIKey = 'AIzaSyDGUzu2MoUorevVY4KadT5T1DayLG3z8a0';

export default {
  form: {
    getLocationOptions: data => axios
      .get(`https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${data}&key=${googlePlacesAPIKey}`)
      .then(res => res.data)
      .catch(err => err)
  }
};
