import React from "react";

export default function ImgError() {
  const handleImgError: React.ReactEventHandler = (event) => {
    const src = event.currentTarget.attributes.getNamedItem('src');
    const dataSrc = event.currentTarget.attributes.getNamedItem('data-src');
    console.log(`src=${src?.value}\ndataSrc=${dataSrc?.value}`);
    if (src?.value.startsWith('https://xop.imshktech.com') && dataSrc?.value) {
      src.value = dataSrc.value;
      event.currentTarget.attributes.setNamedItem(src)
    }
  }
  return (
    <div>
      <img alt="Mount Pavilia/Phase 1 1期"
           width={200}
           data-src="https://us1-uat.propertyraptor.com/hornet/src?p=/mrhk/hornet/prp/img/ed8bf84a9d114a97884078f3cf16785d-wtm.jpg"
           data-srcset="base@w=768,md@w=384"
           onError={handleImgError}
           src="https://xop.imshktech.com/?url=https%3A%2F%2Fus1-uat.propertyraptor.com%2Fhornet%2Fsrc%3Fp%3D%2Fmrhk%2Fhornet%2Fprpm.jpg&amp;f=webp&amp;w=384"
      />
    </div>
  )
}
