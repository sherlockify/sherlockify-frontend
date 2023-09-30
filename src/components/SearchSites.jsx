import {Input, InputGroup, InputLeftElement} from "@chakra-ui/react";
import {SearchIcon} from "@chakra-ui/icons";

export default function SearchSites({setSiteSearch}) {
    return (
        <InputGroup>
            <InputLeftElement pointerEvents='none'>
                <SearchIcon color='gray.300' />
            </InputLeftElement>
            <Input
                placeholder='Search sites...'
                onChange={(e) => setSiteSearch(e.target.value)}
            />
        </InputGroup>
    )
}