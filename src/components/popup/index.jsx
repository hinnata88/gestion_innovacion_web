import Swal from 'sweetalert2';

//! position: top-left, top-right, top-center, bottom-left, bottom-right, bottom-center
//! type: info, success, warning, error, default
const CustomPopup = (icon, message) => {
  const Toast = Swal.mixin({
    toast: true,
    position: 'bottom-end',
    showConfirmButton: false,
    timer: 3000,
    timerProgressBar: true,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer);
      toast.addEventListener('mouseleave', Swal.resumeTimer);
    }
  });

  return Toast.fire({
    icon: icon,
    title: message
  });
};

export default CustomPopup;
