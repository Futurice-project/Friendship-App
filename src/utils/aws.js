import apiRoot from './api.config';

export const getPreSignedUrl = async (type, formValues) => {
  let link = '/sign-s3?file-name=';
  let data;
  switch (type) {
    case 'PROFILE':
      link += 'profile/';
      data = {
        itemName: formValues.username,
        imgType: formValues.image.type,
        url: formValues.image.uri,
      };
      break;
    case 'EVENT':
      link += 'events/';
      data = formValues;
      break;
  }
  return await fetch(
    `${apiRoot}${link}${data.itemName}.jpg&file-type=${data.imgType}`,
  )
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      const { signedRequest, url } = myJson;
      const xhr = new XMLHttpRequest();
      xhr.open('PUT', signedRequest);
      xhr.onreadystatechange = function() {
        if (xhr.readyState === 4) {
          if (xhr.status === 200) {
            console.log('Image successfully uploaded to S3');
          } else {
            console.log('Error while sending the image to S3');
          }
        }
      };
      xhr.setRequestHeader('Content-Type', 'image/jpeg');
      xhr.send({
        uri: data.url,
        type: 'image/jpeg',
        name: `${data.itemName}.jpg`,
      });
      return url;
    });
};
