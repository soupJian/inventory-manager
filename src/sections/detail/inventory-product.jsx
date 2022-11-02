import React, { useState } from 'react'
import Image from 'next/image'
// components
import { Box, Flex, Icon, Text, Wrapper } from '../../components/commons'
import CostModal from '../../components/cost-modal'
// js
import { formatMoney } from '../../utils/formatMoney'
// css
import styled from 'styled-components'
import styles from './index.module.scss'

const Product = ({
  product,
  backLink,
  onDelete,
  showEditModal,
  parts,
  changePart
}) => {
  const [costInfo, setCostInfo] = useState({
    show: false,
    CustomEntryDuty: 0,
    CustomerShipping: 0,
    ItemCost: 0,
    OceanFreight: 0,
    WarehouseDelivery: 0,
    total: 0
  })
  return (
    <Wrapper
      styles={{ position: 'relative' }}
      height="auto"
      padding="21px 33px"
    >
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
            {product.Name}
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
      <Wrapper padding="37px 0 0 55px">
        <Flex gap="20px" justifyContent="flex-start">
          {product?.Image && (
            <ImageWrapper>
              <Image
                src={product.Image}
                alt="product image"
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
            gap="20px"
          >
            <Flex
              alignItems="flex-start"
              justifyContent="flex-start"
              gap="60px"
              style={{ width: '100%' }}
            >
              <AttrGroup>
                <AttrName>PRODUCT NAME</AttrName>
                <AttrValue>{product.Name}</AttrValue>
              </AttrGroup>
              <AttrGroup>
                <AttrName>SKU</AttrName>
                <AttrValue>{product.SKU}</AttrValue>
              </AttrGroup>
              <AttrGroup>
                <AttrName>SYSTEM ID</AttrName>
                <AttrValue>{product.SystemId}</AttrValue>
              </AttrGroup>
              <AttrGroup>
                <AttrName>US COST</AttrName>
                <AttrValue>
                  <div
                    className={`${styles.activeText}  ${styles.pointer}`}
                    onClick={() => {
                      let list = []
                      parts.forEach((item) => {
                        for (let i = 0; i < item.Quantity; i++) {
                          list.push(item.Inventory)
                        }
                      })
                      setCostInfo({
                        show: true,
                        total: product.TotalCost,
                        parts: list
                      })
                    }}
                  >
                    {'$' + formatMoney(product.TotalCost)}
                  </div>
                </AttrValue>
              </AttrGroup>
            </Flex>
            {product.Parts.length > 0 && (
              <Flex
                alignItems="flex-start"
                justifyContent="flex-start"
                gap="60px"
                style={{ width: '100%' }}
              >
                <AttrGroup>
                  <AttrName>PARTS</AttrName>
                </AttrGroup>
                <AttrGroup>
                  <AttrName>DIMENSIONS</AttrName>
                </AttrGroup>
                <AttrGroup>
                  <AttrName>WIEIGHT</AttrName>
                </AttrGroup>
                <AttrGroup>
                  <AttrName>COUNT</AttrName>
                </AttrGroup>
              </Flex>
            )}
            {parts.length > 0 &&
              parts.map((partItem, index) => {
                return (
                  <Flex
                    key={partItem.Inventory.SKU}
                    alignItems="flex-start"
                    justifyContent="flex-start"
                    gap="60px"
                    style={{ width: '100%' }}
                  >
                    <AttrGroup>
                      <AttrValue>{partItem.Inventory.Name}</AttrValue>
                    </AttrGroup>
                    <AttrGroup>
                      <AttrValue>
                        {partItem.activeLwh == 'in.'
                          ? partItem.Inventory.attr.length
                          : Number(
                              partItem.Inventory.attr.length * 0.45359237
                            ).toFixed(1)}{' '}
                        X{' '}
                        {partItem.activeLwh == 'in.'
                          ? partItem.Inventory.attr.width
                          : Number(
                              partItem.Inventory.attr.width * 0.45359237
                            ).toFixed(1)}{' '}
                        X{' '}
                        {partItem.activeLwh == 'in.'
                          ? partItem.Inventory.attr.height
                          : Number(
                              partItem.Inventory.attr.height * 0.45359237
                            ).toFixed(1)}
                        {partItem.activeLwh == 'in.' && (
                          <>
                            <span
                              className={
                                partItem.activeLwh == 'cm'
                                  ? `${styles.activeText} ${styles.pointer}`
                                  : `${styles.pointer}`
                              }
                              style={{ margin: '0 5px' }}
                              onClick={() =>
                                changePart('activeLwh', 'in.', index)
                              }
                            >
                              in.
                            </span>
                            <span
                              className={
                                partItem.activeLwh == 'in.'
                                  ? `${styles.activeText} ${styles.pointer}`
                                  : `${styles.pointer}`
                              }
                              onClick={() =>
                                changePart('activeLwh', 'cm', index)
                              }
                            >
                              cm
                            </span>
                          </>
                        )}
                        {partItem.activeLwh == 'cm' && (
                          <>
                            <span
                              className={
                                partItem.activeLwh == 'in.'
                                  ? `${styles.activeText} ${styles.pointer}`
                                  : `${styles.pointer}`
                              }
                              style={{ margin: '0 5px' }}
                              onClick={() =>
                                changePart('activeLwh', 'cm', index)
                              }
                            >
                              cm
                            </span>
                            <span
                              className={
                                partItem.activeLwh == 'cm'
                                  ? `${styles.activeText} ${styles.pointer}`
                                  : `${styles.pointer}`
                              }
                              onClick={() =>
                                changePart('activeLwh', 'in.', index)
                              }
                            >
                              in.
                            </span>
                          </>
                        )}
                      </AttrValue>
                    </AttrGroup>
                    <AttrGroup>
                      <AttrValue>
                        {partItem.activeWeight == 'lbs.'
                          ? partItem.Inventory.attr.weight
                          : Number(
                              partItem.Inventory.attr.weight * 0.45359237
                            ).toFixed(1)}
                        {partItem.activeWeight == 'lbs.' && (
                          <>
                            <span
                              className={
                                partItem.activeWeight == 'kg'
                                  ? `${styles.activeText} ${styles.pointer}`
                                  : `${styles.pointer}`
                              }
                              style={{ margin: '0 5px' }}
                              onClick={() =>
                                changePart('activeWeight', 'lbs.', index)
                              }
                            >
                              lbs.
                            </span>
                            <span
                              className={
                                partItem.activeWeight == 'lbs.'
                                  ? `${styles.activeText} ${styles.pointer}`
                                  : `${styles.pointer}`
                              }
                              onClick={() =>
                                changePart('activeWeight', 'kg', index)
                              }
                            >
                              kg
                            </span>
                          </>
                        )}
                        {partItem.activeWeight == 'kg' && (
                          <>
                            <span
                              className={
                                partItem.activeWeight == 'lbs.'
                                  ? `${styles.activeText} ${styles.pointer}`
                                  : `${styles.pointer}`
                              }
                              style={{ margin: '0 5px' }}
                              onClick={() =>
                                changePart('activeWeight', 'kg', index)
                              }
                            >
                              kg
                            </span>
                            <span
                              className={
                                partItem.activeWeight == 'kg'
                                  ? `${styles.activeText} ${styles.pointer}`
                                  : `${styles.pointer}`
                              }
                              onClick={() =>
                                changePart('activeWeight', 'lbs.', index)
                              }
                            >
                              lbs.
                            </span>
                          </>
                        )}
                      </AttrValue>
                    </AttrGroup>
                    <AttrGroup>
                      <AttrValue>{partItem.Quantity}</AttrValue>
                    </AttrGroup>
                  </Flex>
                )
              })}
            <Flex
              alignItems="flex-start"
              justifyContent="flex-start"
              gap="60px"
              style={{ width: '100%' }}
            >
              <AttrGroup>
                <AttrName>STOCK</AttrName>
                <AttrValue>{product.Stock}</AttrValue>
              </AttrGroup>
              <AttrGroup>
                <AttrName>AVAILABLE</AttrName>
                <AttrValue>{product.Available}</AttrValue>
              </AttrGroup>
              <AttrGroup></AttrGroup>
              <AttrGroup></AttrGroup>
            </Flex>
            <AttrGroup
              alignItems="flex-start"
              justifyContent="flex-start"
              gap="60px"
              style={{ width: '100%' }}
            >
              <AttrName>TAGS</AttrName>
              <Flex
                alignItems="flex-start"
                justifyContent="flex-start"
                gap="10px"
              >
                {product.Tags.map((tag) => {
                  return (
                    <Tag key={tag}>
                      <AttrValue>{tag}</AttrValue>
                    </Tag>
                  )
                })}
              </Flex>
            </AttrGroup>
          </Flex>
        </Wrapper>
      </Wrapper>
      {costInfo.show && (
        <CostModal costInfo={costInfo} setCostInfo={setCostInfo} />
      )}
    </Wrapper>
  )
}

export default Product

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
