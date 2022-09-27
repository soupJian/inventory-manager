import styled from "styled-components"
import { Flex, Text, Wrapper } from "../../components/commons"

const WarehouseUnit = ({children, unit, label, xLabel, yLabel}) => {
    return (
        <UnitWrapper padding="0">
            <Flex alignItems="center" justifyContent="flexstart" gap="16px">
                <Line />
                <Text size="18px" color="#000000" family="Rubik" weight="600">Unit {unit}</Text>
                <Text size="18px" color="#000000" family="Lato" weight="500">{label}</Text>
            </Flex>
            <Wrapper styles={{position: "relative", "margin-top": "24px", width: "auto"}} padding="22px 28px 0 0">
                <XLabel>
                    <Flex alignItems="center" justifyContent="space-around">
                        {
                            xLabel?.map(label => (
                                <Text key={label} color="#999999" family="Rubik" size="14px">{label}</Text>
                            ))
                        }
                    </Flex>
                </XLabel>
                <YLabel>
                    <Flex styles={{height: "100%"}} direction="column" alignItems="center" justifyContent="space-around">
                        {
                            yLabel?.map(label => (
                                <Text key={label} color="#999999" family="Rubik" size="14px">{label}</Text>
                            ))
                        }
                    </Flex>
                </YLabel>
                {children}
            </Wrapper>
        </UnitWrapper>
    )
}

export default WarehouseUnit

const UnitWrapper = styled(Wrapper)`
    display: flex;
    flex-direction: column;
    align-items: flex-start;
`

const Line = styled.div`
    height: 18px;
    width: 4px;
    background-color: #000000;
`
const YLabel = styled.div`
    position: absolute;
    bottom: 0;
    right: 0;
    height: 100%;
    transform: translateX(0%);
`
const XLabel = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
`