export const getGeolocation = async () => {
  try {
    const position = await new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(resolve, reject);
    });

    const { latitude, longitude } = position.coords;

    const response = await fetch(
      `https://api.bigdatacloud.net/data/reverse-geocode-client?latitude=${latitude}&longitude=${longitude}&localityLanguage=en`
    );

    const data = await response.json();

    return {
      location: {
        latitude,
        longitude,
        city: data.city,
        country: data.principalSubdivision,
      },
      error: null,
    };
  } catch (err) {
    return {
      location: null,
      error: err.message,
    };
  }
};

export default getGeolocation; // Default export
