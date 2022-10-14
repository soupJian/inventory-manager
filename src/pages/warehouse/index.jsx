import { useState } from 'react'
import { Flex, Icon, Input, Tab, Tabs, Wrapper } from '../../components/commons'
import Managing from '../../sections/warehouse/Managing'
import Receiving from '../../sections/warehouse/Receiving'
import Settling from '../../sections/warehouse/Settling'

const Warehouse = () => {
  const [activeTab, setActiveTab] = useState('Receiving')
  return (
    <Wrapper
      styles={{ 'min-height': '100%' }}
      height="auto"
      padding="21px 29px"
    >
      <Flex justifyContent="space-between">
        <Tabs>
          <Tab
            onClick={() => setActiveTab('Receiving')}
            active={'Receiving' === activeTab}
          >
            Receiving
          </Tab>
          {/* <Tab
            onClick={() =>
              dispatch({ type: 'changePageType', payload: 'sending' })
            }
            active={'sending' === activeTab}
            idx={0}
          >
            Sending
          </Tab> */}
          <Tab
            onClick={() => setActiveTab('Settling')}
            active={'Settling' === activeTab}
            idx={1}
          >
            Settling
          </Tab>
          <Tab
            onClick={() => setActiveTab('Managing')}
            active={'Managing' === activeTab}
            idx={1}
          >
            Managing
          </Tab>
        </Tabs>
        {activeTab === 'Settling' && (
          <Input
            type="text"
            placeholder="Search name or SKU"
            startIcon={<Icon name="search" width="30px" height="30px" />}
          />
        )}
      </Flex>
      {activeTab === 'Settling' && <Settling />}
      {activeTab === 'Receiving' && <Receiving />}
      {activeTab === 'Managing' && <Managing />}

      {/* <>
          <Flex
            alignItems="flex-start"
            justifyContent="flex-start"
            styles={{ width: '100%', 'padding-top': '58px', gap: '40px' }}
          >
            <CustomInputGroup>
              <Label htmlFor="warehouse-recieving-sku">SKU</Label>
              <Input
                readOnly={lookUpLoading}
                endIcon={
                  <LookupBtn
                    disabled={lookUpLoading}
                    onClick={() => lookUpItem('sku')}
                  >
                    Look up
                  </LookupBtn>
                }
                wrapperStyles={{ 'margin-top': '16px', 'min-height': '59px' }}
                inputStyles={{ width: '100%' }}
                placeholder="Type"
                value={sku}
                onChange={(e) => setSku(e.target.value)}
                name="sku"
                type="text"
                id="warehouse-recieving-sku"
              />
            </CustomInputGroup>
            <Separator>or</Separator>
            <CustomInputGroup>
              <Label htmlFor="warehouse-recieving-barcode">Barcode</Label>
              <Input
                readOnly={lookUpLoading}
                endIcon={
                  <LookupBtn
                    disabled={lookUpLoading}
                    onClick={() => lookUpItem('barcode')}
                  >
                    Look up
                  </LookupBtn>
                }
                wrapperStyles={{ 'margin-top': '16px', 'min-height': '59px' }}
                inputStyles={{ width: '100%' }}
                placeholder="Type"
                value={barcode}
                onChange={(e) => setBarcode(e.target.value)}
                name="barcode"
                type="text"
                id="warehouse-recieving-barcode"
              />
            </CustomInputGroup>
          </Flex>
          <Wrapper padding="16px 0">
            <Alert
              type="notification"
              styles={{
                display: 'flex',
                'align-items': 'center',
                borderRadius: '10px',
                width: 'fit-content'
              }}
            >
              <Icon name="notification" width="20px" height="20px" />
              <Text>
                Can’t find the item.
                <TriggeringText onClick={() => setNewItemModal(true)}>
                  Add it to the system
                </TriggeringText>
              </Text>
            </Alert>
          </Wrapper>
          {lookUpLoading && <Loader size={30} />}
          {lookUpError && <ErrorMessage>{lookUpError}</ErrorMessage>}
          {lookedUpItem && !lookUpLoading && (
            <Wrapper padding="30px 0 39px">
              <LookedUpItemName>
                Intaking: <strong>{lookedUpItem.Name}</strong>
              </LookedUpItemName>

              <Wrapper
                padding="0"
                styles={{ 'max-width': '335px', 'margin-top': '39px' }}
              >
                <InputGroup>
                  <Label htmlFor="warehouse-recieving-barcode">count</Label>
                  <Input
                    wrapperStyles={{
                      'margin-top': '16px',
                      'min-height': '59px'
                    }}
                    inputStyles={{ width: '100%' }}
                    placeholder="Type"
                    value={lookedUpItemCount}
                    onChange={(e) => setLookedUpItemCount(e.target.value)}
                    name="item-count"
                    type="number"
                    id="warehouse-recieving-lookedup-item"
                  />
                </InputGroup>
                <ButtonV1
                  loading={lookUpLoading}
                  onClick={saveItem}
                  styles={{ 'margin-top': '36px' }}
                  minWidth="78px"
                  kind="primary"
                >
                  Save
                </ButtonV1>
              </Wrapper>
            </Wrapper>
          )}
        </> */}
    </Wrapper>
  )
}

export default Warehouse
