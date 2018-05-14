import apiRoot from './api.config';

export const getPreSignedUrl = async formValues =>
  await fetch(
    `${apiRoot}/sign-s3?file-name=profile/${formValues.username}.jpg&file-type=${formValues
      .image.type}`,
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
        uri: formValues.image.uri,
        type: 'image/jpeg',
        name: `${formValues.username}.jpg`,
      });
      return url;
    });
