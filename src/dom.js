export function scroll() {
    let leftArrow = document.getElementById('left-arrow')
    let rightArrow = document.getElementById('right-arrow');
    let hoursContainer = document.getElementById('hours-container')
    let clicked = false;
    let clickStart;
    let scrollLeft;


    hoursContainer.addEventListener('mousedown', (e) => {
        clicked = true;
        clickStart = e.pageX - hoursContainer.offsetLeft;
        scrollLeft = hoursContainer.scrollLeft;
    })

    hoursContainer.addEventListener('mouseleave', () => {
        clicked = false
    })

    hoursContainer.addEventListener('mouseup', () => {
        clicked = false;
    })

    hoursContainer.addEventListener('mousemove', (e) => {
        if (!clicked) return;
        e.preventDefault()
        const clcikEnd = e.pageX - hoursContainer.offsetLeft;
        const walk = (clcikEnd - clickStart) * 4;
        hoursContainer.scrollLeft = scrollLeft - walk
    })




    leftArrow.onclick = () => {
        hoursContainer.scrollBy({ left: - hoursContainer.offsetWidth, top: 0, behavior: 'smooth' })
        console.log('scrolled left')
    };

    rightArrow.addEventListener('click', () => {
        hoursContainer.scrollBy({ left: +hoursContainer.offsetWidth, top: 0, behavior: 'smooth' })

        console.log('scrolled right')
    })
}


