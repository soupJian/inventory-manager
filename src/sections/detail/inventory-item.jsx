import React, { useState } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import {
  Box,
  Flex,
  Icon,
  Loader,
  Text,
  Wrapper
} from '../../components/commons'
import CostModal from '../../components/cost-modal'
import { Row, Col } from 'antd'
import styles from './index.module.scss'
import { formatMoney } from '../../utils/formatMoney'

const Item = ({ loading, item, backLink, onDelete, showEditModal }) => {
  const [costInfo, setCostInfo] = useState({
    show: false,
    CustomEntryDuty: 0,
    CustomerShipping: 0,
    ItemCost: 0,
    OceanFreight: 0,
    WarehouseDelivery: 0,
    total: 0
  })
  const [activeWeight, setActiveWeight] = useState('lbs.')
  const [activeLwh, setActiveLwh] = useState('in.')
  return (
    <>
      {item && (
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
                  style={{ width: '100%' }}
                >
                  <AttrGroup>
                    <AttrName>ITEM NAME</AttrName>
                    <AttrValue>{item.Name}</AttrValue>
                  </AttrGroup>
                  <AttrGroup>
                    <AttrName>SKU</AttrName>
                    <AttrValue>{item.SKU}</AttrValue>
                  </AttrGroup>
                  <AttrGroup>
                    <AttrName>BARCODE</AttrName>
                    <AttrValue>{item.Barcode}</AttrValue>
                  </AttrGroup>
                  <AttrGroup>
                    <AttrName>SYSTEM ID</AttrName>
                    <AttrValue>{item.SystemId}</AttrValue>
                  </AttrGroup>
                </Flex>
                <Flex
                  alignItems="flex-start"
                  justifyContent="flex-start"
                  gap="60px"
                  style={{ width: '100%' }}
                >
                  <AttrGroup>
                    <AttrName>DIMENSIONS</AttrName>
                    <AttrValue>
                      {activeLwh == 'in.'
                        ? item.attr?.length || 0
                        : item.attr?.length * (0.45359237).toFixed(1) || 0}{' '}
                      X{' '}
                      {activeLwh == 'in.'
                        ? item.attr?.width || 0
                        : item.attr?.width * (0.45359237).toFixed(1) || 0}{' '}
                      X{' '}
                      {activeLwh == 'in.'
                        ? item.attr?.height || 0
                        : item.attr?.height * (0.45359237).toFixed(1) || 0}
                      {activeLwh == 'in.' && (
                        <>
                          <span
                            className={
                              activeLwh == 'in.'
                                ? `${styles.activeText} ${styles.pointer}`
                                : `${styles.pointer}`
                            }
                            style={{ margin: '0 5px' }}
                            onClick={() => setActiveLwh('in.')}
                          >
                            in.
                          </span>
                          <span
                            className={
                              activeLwh == 'cm'
                                ? `${styles.activeText} ${styles.pointer}`
                                : `${styles.pointer}`
                            }
                            onClick={() => setActiveLwh('cm')}
                          >
                            cm
                          </span>
                        </>
                      )}
                      {activeLwh == 'cm' && (
                        <>
                          <span
                            className={
                              activeLwh == 'cm'
                                ? `${styles.activeText} ${styles.pointer}`
                                : `${styles.pointer}`
                            }
                            style={{ margin: '0 5px' }}
                            onClick={() => setActiveLwh('cm')}
                          >
                            cm
                          </span>
                          <span
                            className={
                              activeLwh == 'in.'
                                ? `${styles.activeText} ${styles.pointer}`
                                : `${styles.pointer}`
                            }
                            onClick={() => setActiveLwh('in.')}
                          >
                            in.
                          </span>
                        </>
                      )}
                    </AttrValue>
                  </AttrGroup>
                  <AttrGroup>
                    <AttrName>WEIGHT</AttrName>
                    <AttrValue>
                      {activeWeight == 'lbs.'
                        ? item.attr?.weight || 0
                        : item.attr?.weight * (0.45359237).toFixed(1) || 0}
                      {activeWeight == 'lbs.' && (
                        <>
                          <span
                            className={
                              activeWeight == 'lbs.'
                                ? `${styles.activeText} ${styles.pointer}`
                                : `${styles.pointer}`
                            }
                            style={{ margin: '0 5px' }}
                            onClick={() => setActiveWeight('lbs.')}
                          >
                            lbs.
                          </span>
                          <span
                            className={
                              activeWeight == 'kg'
                                ? `${styles.activeText} ${styles.pointer}`
                                : `${styles.pointer}`
                            }
                            onClick={() => setActiveWeight('kg')}
                          >
                            kg
                          </span>
                        </>
                      )}
                      {activeWeight == 'kg' && (
                        <>
                          <span
                            className={
                              activeWeight == 'kg'
                                ? `${styles.activeText} ${styles.pointer}`
                                : `${styles.pointer}`
                            }
                            style={{ margin: '0 5px' }}
                            onClick={() => setActiveWeight('kg')}
                          >
                            kg
                          </span>
                          <span
                            className={
                              activeWeight == 'lbs.'
                                ? `${styles.activeText} ${styles.pointer}`
                                : `${styles.pointer}`
                            }
                            onClick={() => setActiveWeight('lbs.')}
                          >
                            lbs.
                          </span>
                        </>
                      )}
                    </AttrValue>
                  </AttrGroup>
                  <AttrGroup>
                    <AttrName>US COST</AttrName>
                    <AttrValue>
                      <div
                        className={`${styles.activeText} $ ${styles.pointer}`}
                        onClick={() => {
                          setCostInfo({
                            show: true,
                            ...item.Cost,
                            total: item.TotalCost
                          })
                        }}
                      >
                        {'$' + formatMoney(item.TotalCost)}
                      </div>
                    </AttrValue>
                  </AttrGroup>
                  <AttrGroup>
                    <AttrName>LOCATION</AttrName>
                    <AttrValue>
                      {item.Location?.length
                        ? item.Location.join('  ;  ')
                        : 'Unsettled'}
                    </AttrValue>
                  </AttrGroup>
                </Flex>
                <Flex
                  alignItems="flex-start"
                  justifyContent="flex-start"
                  gap="60px"
                  style={{ width: '100%' }}
                >
                  <AttrGroup>
                    <AttrName>STOCK</AttrName>
                    <AttrValue>{item.Stock}</AttrValue>
                  </AttrGroup>
                  <AttrGroup>
                    <AttrName>AVAILABLE</AttrName>
                    <AttrValue>{item.Available}</AttrValue>
                  </AttrGroup>
                  <AttrGroup>
                    <AttrName>REORDER ALERT</AttrName>
                    <AttrValue>{item.ReorderAlert}</AttrValue>
                  </AttrGroup>
                  <AttrGroup></AttrGroup>
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
                    style={{ width: '100%' }}
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
      )}
      {costInfo.show && (
        <CostModal costInfo={costInfo} setCostInfo={setCostInfo} />
      )}
    </>
  )
}

export default React.memo(Item)

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
  flex: 1;
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
