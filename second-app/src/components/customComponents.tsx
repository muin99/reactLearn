



const isStudent: boolean = true;
export default function CustomComponents() {
    return (
        <>
            {
                isStudent ? (<p>You are a student</p>) : (<p>You are not a student</p>)
            }
        </>
    );
}


