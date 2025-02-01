import './ScrollButtons.css';

function ScrollButtons({children, targetLength, setter}) {

    const onClickSelectNextHandler = () => {

        setter(current => {

            if (current === (targetLength - 1)) {
                return 0;
            } else {
                return (current + 1);
            }

        });

    }

    const onClickSelectPreviousHandler = () => {

        setter(current => {

            if (current === 0) {
                return (targetLength - 1);
            } else {
                return (current - 1)
            }

        });

    }

    return (
        <div>

            <button onClick={onClickSelectPreviousHandler} className={targetLength > 1 ? '' : 'hidden'}>←</button>

            {children}

            <button onClick={onClickSelectNextHandler} className={targetLength > 1 ? '' : 'hidden'}>→</button>

        </div>
    )
}

export default ScrollButtons;