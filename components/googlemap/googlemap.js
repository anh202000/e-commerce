import React from "react";

function GoogleApiWrapper() {
  return (
    <div>
      <iframe
        width="887"
        height="583"
        frameborder="0"
        scrolling="no"
        marginheight="0"
        marginwidth="0"
        id="gmap_canvas"
        src="https://maps.google.com/maps?width=887&amp;height=583&amp;hl=en&amp;q=910A%20Ng%C3%B4%20Quy%E1%BB%81n,%20An%20H%E1%BA%A3i%20B%E1%BA%AFc,%20S%C6%A1n%20Tr%C3%A0,%20%C4%90%C3%A0%20N%E1%BA%B5ng%20550000%20Tuy%20Hoa+(Youngz%20Shop)&amp;t=p&amp;z=16&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
      ></iframe>
      <a href="https://maps-generator.com/">Maps Generator</a>
    </div>
  );
}

export default React.memo(GoogleApiWrapper);
