import '@testing-library/jest-dom';
import React from 'react';
import Modal from './Modal';
import { render, screen, fireEvent } from '@testing-library/react';
import DateUtilities from './../../Utilities/DateUtilities';
test('Return null when Modal is not set to show', () => {
    const { container } = render(
        <Modal show={false} onClose={function () {}} modelData={{}}></Modal>,
    );
    expect(container.firstChild).toBeNull();
});
test('Return empty information when value not set', () => {
    const { container } = render(
        <Modal show={true} onClose={function () {}} modelData={{}}></Modal>,
    );
    expect(container.querySelector('.tabcontent').textContent).toEqual('');
});
test('Should contain formated time', () => {
    const data = {
        title: 'Test Title',
        duration: 25,
        status: 'passed',
        failureMessages: [],
    };
    const { container } = render(
        <Modal show={true} onClose={function () {}} modelData={data}></Modal>,
    );
    expect(
        container.firstChild.firstChild.textContent.indexOf(
            new DateUtilities().convertMillisecondsToTime(25),
        ),
    ).toBeGreaterThan(0);
});
test('Should hide error message when no error message passed', () => {
    const data = {
        title: 'Test Title',
        duration: 25,
        status: 'passed',
        failureMessages: [],
    };
    render(
        <Modal show={true} onClose={function () {}} modelData={data}></Modal>,
    );
    expect(screen.getByText('Error Message').style.visibility).toEqual(
        'hidden',
    );
});
test('Should show error message when error message passed', () => {
    const data = {
        title: 'Test Title',
        duration: 25,
        status: 'passed',
        failureMessages: ['\x1b[30mblack\x1b[37mwhite'],
    };
    render(
        <Modal show={true} onClose={function () {}} modelData={data}></Modal>,
    );
    expect(screen.getByText('Error Message').style.visibility).toEqual(
        'visible',
    );
});

test('Should call funtion on close click', () => {
    const mockCallback = jest.fn();
    const data = {
        title: 'Test Title',
        duration: 25,
        status: 'passed',
        failureMessages: ['\x1b[30mblack\x1b[37mwhite'],
    };
    const { container } = render(
        <Modal show={true} onClose={mockCallback} modelData={data}></Modal>,
    );
    fireEvent.click(container.querySelector('.modal-close'));
    expect(mockCallback.mock.calls.length).toBe(1);
});

test('Should be able to change tab click', () => {
    const mockCallback = jest.fn();
    const data = {
        title: 'Test Title',
        duration: 25,
        status: 'passed',
        failureMessages: ['\x1b[30mblack\x1b[37mwhite'],
    };
    render(<Modal show={true} onClose={mockCallback} modelData={data}></Modal>);
    fireEvent.click(screen.getByText('Error Message'));
    expect(screen.getByText('Error Message').classList).toContain('active');
    expect(screen.getByText('Information').classList).toContain('inactive');
    fireEvent.click(screen.getByText('Information'));
    expect(screen.getByText('Error Message').classList).toContain('inactive');
    expect(screen.getByText('Information').classList).toContain('active');
});
