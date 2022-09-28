import Image from 'next/image'
import styled from 'styled-components'
import {
  Box,
  Flex,
  Icon,
  Input,
  Loader,
  Text,
  Wrapper
} from '../../components/commons'

const Item = ({ loading, item, backLink, onDelete, showEditModal }) => {
  if (!item) return <> </>
  return (
    <Wrapper styles={{ position: 'relative' }} padding="21px 33px">
      {loading && (
        <LoadingWrapper>
          <Loader size={100} />
          <Text>Loading Item...</Text>
        </LoadingWrapper>
      )}
      <Flex alignItems="center" justifyContent="space-between">
        <Flex alignItems="center">
          <Icon
            onClick={backLink}
            styles={{ cursor: 'pointer', 'margin-right': '41px' }}
            name="chevron"
            height="22px"
            width="14px"
          />
          <Text as="h1" weight="500" size="24px">
            {item.Name}
          </Text>
        </Flex>
        <Flex>
          <ActionButton onClick={() => showEditModal(true)} bg="#000000">
            <Icon
              styles={{ filter: 'brightness(0) invert(1)' }}
              name="edit"
              width="22px"
              height="22px"
            />
          </ActionButton>
          <ActionButton onClick={onDelete} bg="#C4C4C4">
            <Icon name="trash" width="22px" height="22px" />
          </ActionButton>
        </Flex>
      </Flex>
      <Wrapper height="auto" padding="37px 0 0 55px">
        <Flex gap="20px" justifyContent="flex-start">
          {item?.Image && (
            <ImageWrapper>
              <Image
                src={item.Image}
                alt="item image"
                width={136}
                height={136}
                layout="responsive"
                objectFit="contain"
              />
            </ImageWrapper>
          )}
          <Box
            as="button"
            borderType="dashed"
            onClick={(e) => {
              e.stopPropagation()
            }}
            styles={{ width: '176px', height: '176px' }}
          >
            <Wrapper
              padding="0"
              styles={{
                width: '60px',
                height: '60px',
                'margin-bottom': '16px'
              }}
            >
              <Image
                src="/images/image-placeholder.png"
                alt="scan"
                layout="fill"
              />
            </Wrapper>
            <Text>Upload</Text>
          </Box>
        </Flex>
        <Wrapper padding="55px 0 0">
          <Flex
            direction="column"
            alignItems="flex-start"
            justifyContent="flex-start"
            gap="30px"
          >
            <Flex
              alignItems="flex-start"
              justifyContent="flex-start"
              gap="60px"
            >
              <AttrGroup>
                <AttrName>ITEM NAME</AttrName>
                <AttrValue>{item.Name}</AttrValue>
              </AttrGroup>
              <AttrGroup>
                <AttrName>LOCATION</AttrName>
                <AttrValue>
                  {item.Location?.length
                    ? item.Location.join(';')
                    : 'Unsettled'}
                </AttrValue>
              </AttrGroup>
              <AttrGroup>
                <AttrName>US COST</AttrName>
                <AttrValue>$ {item.TotalCost}</AttrValue>
              </AttrGroup>
            </Flex>
            <Flex
              alignItems="flex-start"
              justifyContent="flex-start"
              gap="60px"
            >
              <AttrGroup>
                <AttrName>BARCODE</AttrName>
                <AttrValue>{item.Barcode}</AttrValue>
              </AttrGroup>
              <AttrGroup>
                <AttrName>SKU</AttrName>
                <AttrValue>{item.SKU}</AttrValue>
              </AttrGroup>
            </Flex>
            <Flex
              alignItems="flex-start"
              justifyContent="flex-start"
              gap="60px"
            >
              <AttrGroup>
                <AttrName>STOCK</AttrName>
                <AttrValue>{item.Stock}</AttrValue>
              </AttrGroup>
              <AttrGroup>
                <AttrName>RESERVED</AttrName>
                <AttrValue>{item.Reserved}</AttrValue>
              </AttrGroup>
              <AttrGroup>
                <AttrName>AVAILABLE</AttrName>
                <AttrValue>{item.Available}</AttrValue>
              </AttrGroup>
              <AttrGroup>
                <AttrName>REORDER ALERT</AttrName>
                <AttrValue>{item.ReorderAlert}</AttrValue>
              </AttrGroup>
            </Flex>
            <AttrGroup
              alignItems="flex-start"
              justifyContent="flex-start"
              gap="60px"
            >
              <AttrName>TAGS</AttrName>
              <Flex
                alignItems="flex-start"
                justifyContent="flex-start"
                gap="10px"
              >
                {item?.Tags?.map((tag) => (
                  <Tag key={tag}>
                    <AttrValue>{tag}</AttrValue>
                  </Tag>
                ))}
              </Flex>
            </AttrGroup>
          </Flex>
        </Wrapper>
      </Wrapper>
    </Wrapper>
  )
}

export default Item

const LoadingWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(255, 255, 255, 0.85);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  z-index: 5;
`
const ActionButton = styled.button`
  padding: 14px;
  margin: 0 5px;
  background-color: ${({ theme, bg }) => (bg ? bg : theme.colors.borderColor)};
  border-radius: 8px;
  display: grid;
  place-items: center;
  border: none;
  cursor: pointer;
  transition: all 0.3s ease-in-out;

  &:active {
    transform: scale(0.995);
  }
`
const ImageWrapper = styled.div`
  width: 176px;
  height: 176px;
  border-radius: 10px;
  padding: 20px;
  background-color: #ffffff;
`
const AttrGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 10px;
`

const AttrName = styled.h6`
  font-family: ${({ theme }) => theme.font.family.primary};
  font-size: 14px;
  font-weight: 500;
  line-height: 14px;
  letter-spacing: 0em;
  text-align: left;
  color: ${({ theme }) => theme.colors.tertiaryText};
`
const AttrValue = styled.h6`
  font-family: ${({ theme }) => theme.font.family.secondary};
  font-size: 14px;
  font-weight: 400;
  line-height: 14px;
  letter-spacing: 0em;
  text-align: left;
  color: ${({ theme }) => theme.colors.primaryText};
`

const Tag = styled.div`
  padding: 6px 16px;
  border: 1px solid #000000;
  background-color: 'transparent';
  border-radius: 30px;
`
