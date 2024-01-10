const Profile = require('../models/Profile');

function calculateDistance(latlng1, latlng2) {
  const R = 6371; // Radius of the earth in kilometers
  const [lat1, lon1] = latlng1.split(',').map(parseFloat);
  const [lat2, lon2] = latlng2.split(',').map(parseFloat);
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  const distance = R * c; // Distance in kilometers
  return distance;
}

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

const sort = async (contents, client) => {
  contents = await Promise.all(
    contents.map(async content => {
      const today = new Date();
      const published = new Date(content.date);
      let consumerCategory = {
        distance: 1e9
      };
      content.consumer.forEach(consumer => {
        if (consumer.gender.toLowerCase() == 'both' || consumer.gender.toLowerCase() == client.gender.toLowerCase()) {
          distance = client.age < consumer.ageFrom ? (consumer.ageFrom - client.age) : client.age > consumer.ageTo ? (client.age - consumer.ageTo) : 0;
          if (distance < consumerCategory.distance) {
            consumerCategory = {
              distance,
              consumer
            };
          }
        }
      });
      const company = await Profile.findOne({ _id: content.profile });
      const companylatlng = company.contact.latlng;
      let searchMatchCount = 0;
      const stringified = JSON.stringify(content);
      client.searchHistory.forEach(search => {
        if (stringified.toLowerCase().includes(search.toLowerCase())) {
          searchMatchCount++;
        }
      });
      let companyMatchCount = 0;
      client.clickHistory.forEach(click => {
        if (click.profile == content.profile) {
          companyMatchCount++;
        }
      });
      content.score =
        (content.clickcount * 0.4) -
        (today - published) / 86400000 -
        (consumerCategory.distance * 0.1) +
        (searchMatchCount * 2) -
        (calculateDistance(client.latlng, companylatlng) * 0.01) +
        (companyMatchCount );

      // console.log({
      //   clickcount: content.clickcount,
      //   published: today - published,
      //   ageDistance: consumerCategory.distance,
      //   searchMatchCount,
      //   companyMatchCount,
      //   score: content.score,
      //   distance: calculateDistance(client.latlng, companylatlng)
      // })
      return content;
    })
  );

  // Sort the contents by score in descending order
  contents.sort((a, b) => b.score - a.score);

  // Return the top 10 scorer contents
  return contents;
};

module.exports=sort;