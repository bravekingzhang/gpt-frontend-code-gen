import { Box, Table, Thead, Tbody, Tr, Th, Td, Text, Button, Badge, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalCloseButton, ModalBody, ModalFooter, FormControl, FormLabel, Input } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';

const CouponManagementPage = () => {
  const [coupons, setCoupons] = useState([
    { id: 1, name: 'Coupon 1', discount: '20%', expiryDate: '2022-12-31', status: 'active' },
    { id: 2, name: 'Coupon 2', discount: '30%', expiryDate: '2022-11-30', status: 'active' },
    { id: 3, name: 'Coupon 3', discount: '40%', expiryDate: '2022-10-31', status: 'inactive' },
  ]);

  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newCoupon, setNewCoupon] = useState({name: '', discount: '', expiryDate: '', status: 'inactive'});

  useEffect(() => {
    fetchCoupons();
  }, []);

  const fetchCoupons = async () => {
    const response = await fetch('https://api.example.com/coupons');
    const data = await response.json();
    setCoupons(data);
  };

  const handleActivate = (id) => {
    setCoupons(coupons.map(coupon => coupon.id === id ? { ...coupon, status: 'active' } : coupon));
  }

  const handleDeactivate = (id) => {
    setCoupons(coupons.map(coupon => coupon.id === id ? { ...coupon, status: 'inactive' } : coupon));
  }

  const handleAddCoupon = () => {
    setCoupons([...coupons, {...newCoupon, id: coupons.length + 1}]);
    onClose();
  }

  return (
    <Box>
      <Text fontSize="2xl" mb="5">Coupon Management</Text>
      <Button colorScheme="teal" onClick={onOpen}>Add Coupon</Button>
      <Table variant="striped" mt="5">
        <Thead>
          <Tr>
            <Th>Coupon ID</Th>
            <Th>Coupon Name</Th>
            <Th>Discount</Th>
            <Th>Expiry Date</Th>
            <Th>Status</Th>
            <Th>Actions</Th>
          </Tr>
        </Thead>
        <Tbody>
          {coupons.map((coupon) => (
            <Tr key={coupon.id}>
              <Td>{coupon.id}</Td>
              <Td>{coupon.name}</Td>
              <Td>{coupon.discount}</Td>
              <Td>{coupon.expiryDate}</Td>
              <Td><Badge colorScheme={coupon.status === 'active' ? 'green' : 'red'}>{coupon.status}</Badge></Td>
              <Td>
                <Button size="sm" colorScheme="teal" onClick={() => handleActivate(coupon.id)}>Activate</Button>
                <Button size="sm" colorScheme="red" onClick={() => handleDeactivate(coupon.id)}>Deactivate</Button>
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Add a new coupon</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input placeholder="Coupon Name" onChange={(e) => setNewCoupon({...newCoupon, name: e.target.value})} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Discount</FormLabel>
              <Input placeholder="Discount" onChange={(e) => setNewCoupon({...newCoupon, discount: e.target.value})} />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Expiry Date</FormLabel>
              <Input type="date" onChange={(e) => setNewCoupon({...newCoupon, expiryDate: e.target.value})} />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddCoupon}>
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}

export default CouponManagementPage;