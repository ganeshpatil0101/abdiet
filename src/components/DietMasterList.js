import React, {useState, useRef, useEffect} from 'react';
import DietDetails from './DietDetails';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';

const searchText = (item, searchText)=> {
    return item.dName.toLowerCase().includes(searchText.toLowerCase())
};

const DietMasterList = ({list, onEdit, isAssign}) => {
    const [search, setSearch] = useState('');
    const [dietList, setDietList] = useState([]);

    useEffect(()=>{
        setDietList(list);
    }, [list]);

    const onSearchChange = (text) => {
        setSearch(text);
        if(text) {
            const filteredData = list.filter((i)=> searchText(i, text));
            console.log(filteredData);
            setDietList(filteredData);
        } else {
            setDietList(list);
        }
    };

    return (
        <>
            <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            autoFocus
            id="search"
            label="Search Diet Plans"
            name="search"
            value={search}
            onChange={(event)=> onSearchChange(event.target.value)}
          />
          <Divider />
            {
                dietList.map((dIndex) => <DietDetails 
                    key={dIndex.id} 
                    dietData={dIndex} 
                    onEdit={onEdit}
                    isAssign={isAssign} />)
            }
        </>
    )
}

export default React.memo(DietMasterList);
