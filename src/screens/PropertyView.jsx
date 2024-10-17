import { useParams } from 'react-router-dom';
import OptionsBar from '../components/propertyViewPage/OptionsBar';


const PropertyView = () => {
    const { mode } = useParams();

    return (
        <div className='min-h-[calc(100vh-100px)]'>
            <OptionsBar/>
        </div>
    )
}

export default PropertyView