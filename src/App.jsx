import { useEffect, useState } from 'react';

function App() {
  const [image, setImage] = useState('');
  const [refresh, setRefresh] = useState(false);
  const [allImages, setAllImages] = useState([]);

  function convertToBase64(e) {
    const file = e.target.files[0];
    const maxSizeInBytes = 50 * 1024 * 1024; // 50MB
    // const maxSizeInBytes = 50 * 1024 ; // 50KB
    if (file.size > maxSizeInBytes) {
      alert('File size exceeds the maximum allowed size (50MB).');
      return;
    }
    let reader = new FileReader();
    reader.readAsDataURL(e.target.files[0]);
    reader.onload = () => {
      console.log(reader.result);
      setImage(reader.result);
    };
    reader.onerror = (error) => {
      console.log('error', error);
    };
  }
  const uploadImage = () => {
    fetch('http://localhost:5000/api/images/upload-image', {
      method: 'POST',
      crossDomain: true,
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
        'Access-Control-Allow-Origin': '*',
      },
      body: JSON.stringify({
        base64: image,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setRefresh(true);
      });
  };
  const getImages = () => {
    fetch('http://localhost:5000/api/images/get-all-images', {
      method: 'GET',
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        setAllImages(data.images);
      });
  };
  useEffect(() => {
    getImages();
  }, [refresh]);
  return (
    <>
      <div
        style={{
          backgroundColor: 'royalblue',
          width: '100vw',
          height: 'auto',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '12px',
        }}
      >
        <div
          style={{
            backgroundColor: 'white',
            width: '500px',
            height: '150px',
            borderRadius: '8px',
            padding: '12px',
            display: 'flex',
            marginTop: '50px',
          }}
        >
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              width: '50%',
            }}
          >
            <p
              style={{
                fontSize: '20px',
                fontWeight: 'bold',
                fontFamily: 'sans-serif',
                marginBottom: '6px',
              }}
            >
              Let's Upload
            </p>
            <input
              type="file"
              accept="image/*"
              name=""
              id=""
              onChange={convertToBase64}
            />
            <button
              style={{
                backgroundColor: 'royalblue',
                border: 'none',
                fontSize: '20px',
                color: 'white',
                borderRadius: '4px',
                padding: '6px',
                alignSelf: 'start',
                marginTop: '20px',
                cursor: 'pointer',
              }}
              onClick={uploadImage}
            >
              Upload Image
            </button>
          </div>
          {image === '' || image === null ? (
            ''
          ) : (
            <img
              style={{ width: '50%', height: '100%', backgroundColor: 'red' }}
              width={100}
              height={100}
              src={image}
              alt=""
            />
          )}
        </div>
        <div
          style={{
            width: '700px',
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '12px',
          }}
        >
          {allImages.map((data) => {
            return (
              <>
                <div style={{}}>
                  <img
                    style={{ objectFit: 'fill' }}
                    width={220}
                    height={200}
                    src={data.image}
                  />
                </div>
              </>
            );
          })}
        </div>
      </div>
    </>
  );
}

export default App;
