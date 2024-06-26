import { Box, Table, Thead, Tbody, Tr, Th, Td, Text, Button, Badge } from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';

const CouponManagementPage = () => {
  const [coupons, setCoupons] = useState([
    { id: 1, name: 'Coupon 1', discount: '20%', expiryDate: '2022-12-31', status: 'active' },
    { id: 2, name: 'Coupon 2', discount: '30%', expiryDate: '2022-11-30', status: 'active' },
    { id: 3, name: 'Coupon 3', discount: '40%', expiryDate: '2022-10-31', status: 'inactive' },
  ]);

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

  return (
    <Box>
      <Text fontSize="2xl" mb="5">Coupon Management</Text>
      <Table variant="striped">
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
    </Box>
  );
}

export default CouponManagementPage;