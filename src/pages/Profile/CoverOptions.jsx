const CoverOptions = ({ closeModal, setIsEditingCover, handleSaveBackground }) => {
    const backgroundOptions = [
        "src/assets/background1.jpeg",
        "src/assets/background2.jpg",
        "src/assets/background3.jpg",
        "src/assets/background4.jpg",
        "src/assets/background5.jpg",
        "src/assets/background6.jpg",
    ];

    return (
      <div className="editBack">
        <div style={{ display: 'flex', justifyContent: 'right' }}>
          <button
            className="close-btn"
            onClick={() => {
              closeModal();
              setIsEditingCover(false);
            }}
          >
            X
          </button>
        </div>
        <div className="background-options">
          {backgroundOptions.map((background, index) => (
            <div className="backgroundImg-container" key={index}>
              <img
                src={background}
                alt={`Background ${index + 1}`}
                onClick={() => {
                  closeModal();
                  setIsEditingCover(false);
                  handleSaveBackground(background);
                }}
                style={{ maxWidth: '200px' }}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  export default CoverOptions;