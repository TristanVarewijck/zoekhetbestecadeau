// import React, { useState, useEffect } from "react";
// import { Button } from "@/components/Button";
// import { ArrowUp } from "react-icons/ai"; // Adjust the import based on your actual icon import

// const ScrollToTopButton = ({ targetClassName }) => {
//   const [showButton, setShowButton] = useState(false);

//   useEffect(() => {
//     const targetElement = document.querySelector(`.${targetClassName}`);

//     if (!targetElement) return;

//     const observer = new IntersectionObserver(
//       ([entry]) => {
//         setShowButton(!entry.isIntersecting);
//       },
//       {
//         root: null,
//         threshold: 0,
//       }
//     );

//     observer.observe(targetElement);

//     return () => {
//       if (targetElement) {
//         observer.unobserve(targetElement);
//       }
//     };
//   }, [targetClassName]);

//   return (
//     <>
//       {/* floating button that scrolls back to top */}
//       {showButton && (
//         <Button
//           className="fixed bottom-4 left-6 z-10 border lg:hidden"
//           variant="default"
//           onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//         >
//           Terug naar boven
//           <ArrowUp className="ml-1" size={16} />
//         </Button>
//       )}
//     </>
//   );
// };

// export default ScrollToTopButton;
