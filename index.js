//It's a simple and compact videref ui component.
//Either it'll work or throw "Your browser doesn't support shit".
//You'll find func() in func.pkg.
//dairymilk dark chocos >>

import React, { useRef, useEffect } from 'react';

const App = () => {
  const videos = [
    { id: 1, url: 'https://media.istockphoto.com/id/1148896626/video/adventurous-couple-swimming-with-dolphins.mp4?s=mp4-640x640-is&k=20&c=8Jnn1yaxz219Kwt-ITqCgfXxEah8wlzSRMCoAODw_Sc=', title: 'Video 1' },
    { id: 2, url: 'https://media.istockphoto.com/id/1353792711/video/hikers-walks-on-the-ridge-of-a-mountain.mp4?s=mp4-640x640-is&k=20&c=M8s9MmlD9XeNowuzaWmGlK6t-AcPSRkxmQrJK7zuJkI=', title: 'Video 2' },
    { id: 3, url: 'https://media.istockphoto.com/id/1442018434/video/clouds-in-the-mountain-peaks-in-the-sunlight-aerial-view-of-a-winding-road-in-the-high-and.mp4?s=mp4-640x640-is&k=20&c=nW9tJMZQ7vKgnPCDrkjdGbhhZkw9RQ43L43ZrBthBBQ=', title: 'Video 3' },
    { id: 4, url: 'https://media.istockphoto.com/id/1683920495/video/saggitarius-zodiac-sign-glitching-analog-vhs-effect-saggitarius-glitch-horoscope.mp4?s=mp4-640x640-is&k=20&c=ncj5U9hw331IBa_jAcKlE-ZrGJmL9TqpRC7oh4dk9Xo=', title: 'Video 4' },
  ];

  const videoRefs = useRef(videos.map(() => React.createRef()));

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.5, 
    };

    const handleIntersection = (entries) => {
      entries.forEach((entry) => {
        const videoIndex = videoRefs.current.findIndex((ref) => ref.current === entry.target);
        if (entry.isIntersecting) {
          videoRefs.current[videoIndex].current.play().catch((error) => {
            console.error('Autoplay failed:', error.message);
          });
        } else {
          videoRefs.current[videoIndex].current.pause();
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, observerOptions);

    videoRefs.current.forEach((ref) => {
      observer.observe(ref.current);
    });

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="App">
      {}
      <div style={{ padding: '20px' }}>
        {}
        <div style={{ background: '#4267B2', padding: '10px', marginBottom: '20px' }}>
        </div>

        {}
        <div className="video-feed">
          {videos.map((video, index) => (
            <div
              key={video.id}
              className="video-thumbnail"
              style={{
                width: '100%',
                maxWidth: '600px',
                borderRadius: '8px',
                overflow: 'hidden',
                boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
                marginBottom: '20px',
                margin: 'auto',
                display: 'block', 
              }}
            >
              <video
                ref={videoRefs.current[index]}
                width="100%"
                height="auto"
                controls
                autoPlay={false}
              >
                <source src={video.url} type="video/mp4" />
                Your browser doesn't support shit.
              </video>
              <p style={{ margin: '5px 0', textAlign: 'center', fontWeight: 'bold' }}>{video.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default App;
